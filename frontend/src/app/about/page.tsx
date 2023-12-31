import About from '@/components/About';

export default function aboutPage() {
  return (
	<div className="bg-aboutBg min-h-screen bg-center bg-cover flex items-center justify-center relative overflow-x-hidden md:border-r-8 md:border-l-8 border-[#0F2325] z-0">
		<About />
	</div>
  );
}