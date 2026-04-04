import FeaturesSection from "@/components/home/FeaturesSection";
import HeroSection from "@/components/home/HeroSection";
import PopularTutors from "@/components/home/PopularTutors";
import TrustedByStudents from "@/components/home/TrustedByStudents";

export const metadata = {
	title: "SkillBridge - Find Your Perfect Tutor",
	description: "Browse 1000+ verified tutors across all subjects. Book sessions online and learn from the best.",
};

export default function Home() {
	return (
		<div>
			<HeroSection />
			<FeaturesSection />
			<TrustedByStudents />
			<PopularTutors />
		</div>
	);
}
