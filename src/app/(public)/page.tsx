import FeaturesSection from "@/components/home/FeaturesSection";
import HeroSection from "@/components/home/HeroSection";
import PopularTutors from "@/components/home/PopularTutors";
import TrustedByStudents from "@/components/home/TrustedByStudents";

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
