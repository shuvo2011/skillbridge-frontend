import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env";

export async function GET(req: NextRequest) {
	const path = req.nextUrl.pathname.replace("/api/proxy", "");
	const url = `${env.API_URL}${path}${req.nextUrl.search}`;

	const res = await fetch(url, {
		headers: {
			Cookie: req.headers.get("cookie") || "",
			"Content-Type": "application/json",
		},
		credentials: "include",
	});

	const data = await res.json();
	const response = NextResponse.json(data, { status: res.status });

	const setCookie = res.headers.get("set-cookie");
	if (setCookie) response.headers.set("set-cookie", setCookie);

	return response;
}

export async function POST(req: NextRequest) {
	const path = req.nextUrl.pathname.replace("/api/proxy", "");
	const url = `${env.API_URL}${path}${req.nextUrl.search}`;
	const body = await req.text();

	const res = await fetch(url, {
		method: "POST",
		headers: {
			Cookie: req.headers.get("cookie") || "",
			"Content-Type": "application/json",
		},
		body,
		credentials: "include",
	});

	const data = await res.json();
	const response = NextResponse.json(data, { status: res.status });

	const setCookie = res.headers.get("set-cookie");
	if (setCookie) response.headers.set("set-cookie", setCookie);

	return response;
}
