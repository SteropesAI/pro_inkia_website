const fs = require("fs");

const footerPath = "C:/Users/Laurent/Documents/projet_claude/PRJ-031-inkia-pro/code/components/Footer.tsx";
let footer = fs.readFileSync(footerPath, "utf8");
footer = footer.replace(
  /<Link href="#" className="text-neutral-400 hover:text-\[#66C6E8\] transition-colors">\s*Galerie\s*<\/Link>/,
  '<Link href="/asso" className="text-neutral-400 hover:text-[#66C6E8] transition-colors">\n                  Galerie associations\n                </Link>'
);
fs.writeFileSync(footerPath, footer);

const cfPath = "C:/Users/Laurent/Documents/projet_claude/PRJ-031-inkia-pro/code/components/campaign/CampaignFooter.tsx";
let cf = fs.readFileSync(cfPath, "utf8");
if (!cf.includes('href="/asso"')) {
  cf = cf.replace(
    '<a href="#personnalise" className="block hover:text-white transition-colors">\n              Personnalisé / RDV\n            </a>',
    '<a href="#personnalise" className="block hover:text-white transition-colors">\n              Personnalisé / RDV\n            </a>\n            <Link href="/asso" className="block hover:text-white transition-colors text-neutral-500">\n              Galerie associations\n            </Link>'
  );
  // fallback if accent differs
  if (!cf.includes('href="/asso"')) {
    cf = cf.replace(
      /(<a href="#personnalise"[^>]*>[\s\S]*?<\/a>)/,
      '$1\n            <Link href="/asso" className="block hover:text-white transition-colors text-neutral-500">\n              Galerie associations\n            </Link>'
    );
  }
  fs.writeFileSync(cfPath, cf);
}

const catPath = "C:/Users/Laurent/Documents/projet_claude/PRJ-031-inkia-pro/code/app/asso/[categorie]/page.tsx";
let cat = fs.readFileSync(catPath, "utf8");
cat = cat
  .replace(/Categorie inconnue/g, "Catégorie inconnue")
  .replace(/>Categories</g, ">Catégories<")
  .replace(/categorie \$\{cat\.label\}/g, "catégorie ${cat.label}")
  .replace(/\(oeuvres\)/g, "(œuvres)")
  .replace(/\$\{cat\.count\} oeuvres/g, "${cat.count} œuvres");
fs.writeFileSync(catPath, cat);

console.log("footer has /asso", fs.readFileSync(footerPath,"utf8").includes('href="/asso"'));
console.log("campaign footer has /asso", fs.readFileSync(cfPath,"utf8").includes('href="/asso"'));
console.log("cat accents", fs.readFileSync(catPath,"utf8").includes("Catégorie"));