(function () {
  function value(form, name) {
    const el = form.elements[name];
    return el && el.value ? el.value.trim() : "";
  }

  function bullets(text) {
    if (!text.trim()) return "- [Add details]";
    return text.split(/\n+/).map(line => line.trim()).filter(Boolean).map(line => "- " + line).join("\n");
  }

  function safeTitle(text) {
    return (text || "public-record-packet")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "public-record-packet";
  }

  function buildPacket() {
    const form = document.getElementById("packetForm");
    const title = value(form, "title") || "Public Record Packet";
    const summary = value(form, "summary");
    const timeline = value(form, "timeline");
    const actors = value(form, "actors");
    const evidence = value(form, "evidence");
    const allegations = value(form, "allegations");
    const questions = value(form, "questions");
    const privacy = value(form, "privacy");

    const now = new Date().toISOString().slice(0, 10);

    return `# ${title}

Generated: ${now}

## Attorney Review Gate

This packet is for documentation support, issue spotting, evidence organization, and attorney preparation only.

It is not legal advice. It does not decide legal claims, crimes, damages, deadlines, remedies, jurisdiction, filing strategy, or legal theory. A qualified attorney should make the final call.

## Scope

This packet separates facts, allegations, evidence categories, questions, and privacy concerns so a serious reviewer can understand the record faster.

## Plain-language summary

${summary || "[Add plain-language summary]"}

## Timeline / date list

${bullets(timeline)}

## People, offices, companies, agencies, or roles involved

${bullets(actors)}

## Records / receipts / evidence categories

${bullets(evidence)}

## Allegations or harms

These are allegations or concerns for review, not findings by a court or agency.

${bullets(allegations)}

## Questions for counsel, agency, reporter, or reviewer

${bullets(questions)}

## Evidence gaps

- Which records are missing?
- Which records need certified copies?
- Which screenshots or emails need redaction?
- Which dates need confirmation?
- Which claims need legal review before publication or filing?

## Privacy / do-not-publish notes

${bullets(privacy)}

## Public-safe reminder

Before sharing, remove or redact private addresses, phone numbers, account numbers, Social Security numbers, private medical details, minors' information, raw screenshots, and anything not ready for public review.

## One-line record posture

Prepare the record. Do not dump the wound.
`;
  }

  function setup() {
    const build = document.getElementById("buildPacket");
    const copy = document.getElementById("copyPacket");
    const download = document.getElementById("downloadPacket");
    const out = document.getElementById("packetOutput");
    const form = document.getElementById("packetForm");

    if (!build || !copy || !download || !out || !form) return;

    build.addEventListener("click", function () {
      out.value = buildPacket();
      out.focus();
    });

    copy.addEventListener("click", async function () {
      if (!out.value.trim()) out.value = buildPacket();
      try {
        await navigator.clipboard.writeText(out.value);
        copy.textContent = "Copied";
        setTimeout(() => copy.textContent = "Copy output", 1200);
      } catch (e) {
        out.select();
        document.execCommand("copy");
      }
    });

    download.addEventListener("click", function () {
      if (!out.value.trim()) out.value = buildPacket();
      const title = safeTitle(value(form, "title"));
      const blob = new Blob([out.value], { type: "text/markdown;charset=utf-8" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = title + ".md";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(a.href);
    });
  }

  document.addEventListener("DOMContentLoaded", setup);
})();
