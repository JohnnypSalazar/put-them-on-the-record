
function val(id){return (document.getElementById(id)?.value || '').trim();}
function today(){return new Date().toISOString().slice(0,10);}
function buildPacket(){
  const situation=val('situation')||'General legal mess';
  const happened=val('happened')||'[Paste the facts here.]';
  const dates=val('dates')||'[Dates unknown or approximate.]';
  const people=val('people')||'[People/entities involved.]';
  const records=val('records')||'[Known evidence, reports, screenshots, receipts, messages, audio/video, notices.]';
  const ignored=val('ignored')||'[What was ignored, minimized, misstated, or missing.]';
  const harm=val('harm')||'[What this cost, damaged, delayed, or destabilized.]';
  const want=val('want')||'[What you want next: counsel review, records request, agency complaint, media summary, etc.]';
  const out=`FREE LEGAL PACKET BUILDER\nGenerated: ${today()}\nSituation: ${situation}\n\n1. PLAIN ENGLISH SUMMARY\n${happened}\n\n2. ROUGH TIMELINE\n${dates}\n\n3. PEOPLE / ENTITIES\n${people}\n\n4. EVIDENCE / RECEIPTS\n${records}\n\n5. WHAT WAS IGNORED OR MISSING\n${ignored}\n\n6. HARM / IMPACT\n${harm}\n\n7. REQUESTED NEXT STEP\n${want}\n\n8. QUESTIONS FOR A QUALIFIED HUMAN\n- What records should be requested first?\n- What facts are verified by documents, recordings, messages, or receipts?\n- What facts are allegations needing proof?\n- What deadlines may apply?\n- What should remain private until reviewed?\n- Who has authority to review this situation?\n\n9. RECORDS TO REQUEST\n- Official reports and report numbers.\n- Bodycam, dashcam, call audio, CAD logs, or dispatch notes where relevant.\n- Notices, letters, emails, messages, screenshots, payment records, receipts.\n- Policies, procedures, appeal instructions, complaint forms.\n\n10. REDACTION CHECKLIST\nBefore sharing publicly, remove private addresses, phone numbers, medical details, account numbers, names of minors, and raw evidence that has not been reviewed.\n\nNOT LEGAL ADVICE\nThis is a record-organizing packet, not legal advice, representation, or a promise of results.`;
  const box=document.getElementById('packetOutput');
  if(box) box.textContent=out;
}
function copyPacket(){
  const box=document.getElementById('packetOutput');
  if(!box) return;
  navigator.clipboard?.writeText(box.textContent || '');
}
