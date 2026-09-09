import Link from "next/link";

export default function Nav() {
  return (
    <nav className="w-full px-6 md:px-12 py-5 flex items-center justify-between">
      <Link href="/" className="text-[15px] font-semibold tracking-tight text-[#111111] hover:opacity-70 transition-opacity">
        Matias Goloboff
      </Link>
      <div className="flex items-center gap-6">
        <Link href="/#projects" className="text-[14px] text-[#6b6b6b] hover:text-[#111111] transition-colors">
          Projects
        </Link>
        <Link href="/about" className="text-[14px] text-[#6b6b6b] hover:text-[#111111] transition-colors">
          About me
        </Link>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[14px] px-4 py-1.5 rounded-full border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white transition-all"
        >
          Resume
        </a>
      </div>
    </nav>
  );
}
