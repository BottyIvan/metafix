import { AdSlot } from "@/components/AdSlot";

export default function AboutPage() {
  const aboutSlot = process.env.NEXT_PUBLIC_AD_SLOT_ABOUT || "";

  return (
    <div className="px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-4xl font-black uppercase tracking-[-0.03em] text-foreground">
          Why I built MetaFix
        </h1>

        <div className="space-y-6 text-muted">
          <p className="text-lg leading-relaxed">
            I created MetaFix because I needed a simple, open-source tool to inspect file metadata, without clutter, hidden costs, or uploading anything online. Most solutions I found were either closed, confusing, or required sending files to a server. That did not work for me.
          </p>

          <p className="text-lg leading-relaxed">
            MetaFix lets you drop a file and instantly see its metadata: type, size, creation date, and more. Everything happens locally in your browser. Your files never leave your device. No uploads, no surprises.
          </p>

          <p className="text-lg leading-relaxed">
            I wanted a tool that respects privacy, is easy to use, and stays out of the way. If you have ideas or find a bug, let me know.
          </p>

          <AdSlot adName="about_inline" slot={aboutSlot} />

          <div className="mt-8 border-t border-border pt-6">
            <p className="text-base text-muted">
              Feedback or bug report?
              <span className="block mt-2">
                <a
                  href={`${process.env.NEXT_PUBLIC_GITHUB_URL}/issues`}
                  className="font-medium text-foreground underline underline-offset-4 hover:opacity-70"
                >
                  Contact me
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
