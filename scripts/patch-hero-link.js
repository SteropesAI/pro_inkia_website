const fs = require("fs");
const heroPath = "C:/Users/Laurent/Documents/projet_claude/PRJ-031-inkia-pro/code/components/HeroSection.tsx";
let hero = fs.readFileSync(heroPath, "utf8");
if (!hero.includes('href="/asso"')) {
  hero = hero.replace(
    `          <Link
            href="#contact"
            className="px-8 py-4 bg-transparent hover:bg-white/10 text-white border border-white/60 font-semibold rounded-md transition-all duration-300 flex items-center justify-center gap-2"
          >
            Nous contacter
          </Link>
        </div>
      </div>`,
    `          <Link
            href="#contact"
            className="px-8 py-4 bg-transparent hover:bg-white/10 text-white border border-white/60 font-semibold rounded-md transition-all duration-300 flex items-center justify-center gap-2"
          >
            Nous contacter
          </Link>
        </div>
        <p className="mt-6">
          <Link href="/asso" className="text-white/70 hover:text-white text-sm underline underline-offset-4 decoration-white/40">
            Galerie associations
          </Link>
        </p>
      </div>`
  );
  fs.writeFileSync(heroPath, hero);
}
console.log("hero has /asso", fs.readFileSync(heroPath,"utf8").includes('href="/asso"'));

// strip BOM from files written with Set-Content UTF8
const files = [
  "C:/Users/Laurent/Documents/projet_claude/PRJ-031-inkia-pro/code/components/BeforeAfterSlider.tsx",
  "C:/Users/Laurent/Documents/projet_claude/PRJ-031-inkia-pro/code/components/campaign/AvantApresStrip.tsx",
  "C:/Users/Laurent/Documents/projet_claude/PRJ-031-inkia-pro/code/components/asso/AssoCategoryGallery.tsx",
  "C:/Users/Laurent/Documents/projet_claude/PRJ-031-inkia-pro/code/app/asso/page.tsx",
  "C:/Users/Laurent/Documents/projet_claude/PRJ-031-inkia-pro/code/app/asso/[categorie]/page.tsx",
  "C:/Users/Laurent/Documents/projet_claude/PRJ-031-inkia-pro/code/data/collection.ts",
];
for (const f of files) {
  let s = fs.readFileSync(f);
  if (s[0] === 0xef && s[1] === 0xbb && s[2] === 0xbf) {
    fs.writeFileSync(f, s.slice(3));
    console.log("stripped BOM", f);
  }
}