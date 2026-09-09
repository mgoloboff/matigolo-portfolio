export default function Footer() {
  return (
    <footer className="w-full px-6 md:px-12 py-10 mt-20 border-t border-[#e8e8e4]">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[13px] text-[#6b6b6b]">Matias Goloboff · Portfolio</p>
        <div className="flex items-center gap-6">
          <a
            href="https://linkedin.com/in/matiasgoloboff"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-[#6b6b6b] hover:text-[#111111] transition-colors"
          >
            LinkedIn
          </a>
          <a href="mailto:matigolo@gmail.com" className="text-[13px] text-[#6b6b6b] hover:text-[#111111] transition-colors">
            matigolo@gmail.com
          </a>
          <a href="tel:+972546612881" className="text-[13px] text-[#6b6b6b] hover:text-[#111111] transition-colors">
            054-661-2881
          </a>
        </div>
      </div>
    </footer>
  );
}
