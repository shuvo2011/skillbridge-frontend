// actions/update-profile-picture.ts
"use server";

import cloudinary from "@/lib/cloudinary";
import { cookies } from "next/headers";
import { env } from "@/env";

const extractPublicId = (url: string): string | null => {
	try {
		// https://res.cloudinary.com/cloud/image/upload/v123/skillbridge/avatars/abc.jpg
		const match = url.match(/\/image\/upload\/(?:v\d+\/)?(.+)\.[a-z]+$/);
		return match ? match[1] : null;
	} catch {
		return null;
	}
};

export const updateProfilePicture = async (formData: FormData) => {
	try {
		const file = formData.get("image") as File;

		// session থেকে userId নাও
		const cookieStore = await cookies();
		const cookieHeader = cookieStore
			.getAll()
			.map((c) => `${c.name}=${c.value}`)
			.join("; ");

		const sessionRes = await fetch(`${env.AUTH_URL}/get-session`, {
			headers: { Cookie: cookieHeader },
		});
		const session = await sessionRes.json();
		const userId = session?.user?.id;

		if (!userId) return { data: null, error: { message: "Unauthorized" } };
		if (!file) return { data: null, error: { message: "No image provided" } };
		if (file.size > 2 * 1024 * 1024) {
			return { data: null, error: { message: "Image must be less than 2MB" } };
		}

		const arrayBuffer = await file.arrayBuffer();
		const base64 = Buffer.from(arrayBuffer).toString("base64");
		const dataUri = `data:${file.type};base64,${base64}`;

		const uploaded = await cloudinary.uploader.upload(dataUri, {
			folder: "skillbridge/avatars",
			public_id: userId, // ✅ userId = unique, always same file
			overwrite: true,
			transformation: [{ width: 350, height: 350, crop: "fill", gravity: "face" }],
		});

		const res = await fetch(`${env.AUTH_URL}/update-user`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Cookie: cookieHeader,
				Origin: env.FRONTEND_URL,
			},
			body: JSON.stringify({ image: uploaded.secure_url }),
		});

		if (!res.ok) {
			const errorData = await res.json();
			return { data: null, error: { message: errorData.message || "Failed to update picture" } };
		}

		return { data: await res.json(), error: null };
	} catch (error) {
		console.error("updateProfilePicture error:", error);
		return { data: null, error: { message: "Something Went Wrong" } };
	}
};
