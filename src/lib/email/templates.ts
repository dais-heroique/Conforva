function shell(bodyHtml: string, ctaText: string, ctaHref: string): string {
  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background-color:#08090C;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#08090C;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;">
          <tr>
            <td style="padding-bottom:28px;text-align:center;">
              <span style="color:#ffffff;font-weight:900;font-size:20px;letter-spacing:-0.02em;">CONFORVA</span>
            </td>
          </tr>
          <tr>
            <td style="background-color:#0F0F17;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:32px;">
              ${bodyHtml}
              <table cellpadding="0" cellspacing="0" style="margin-top:28px;">
                <tr>
                  <td style="background-color:#8B5CF6;border-radius:12px;">
                    <a href="https://conforva.com${ctaHref}" style="display:inline-block;padding:12px 24px;color:#ffffff;font-weight:700;font-size:14px;text-decoration:none;">${ctaText}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding-top:24px;text-align:center;">
              <p style="color:#6b7280;font-size:12px;margin:0;">Conforva SAS — contact.conforva@gmail.com</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function p(text: string): string {
  return `<p style="color:#d1d5db;font-size:14px;line-height:1.6;margin:0 0 14px;">${text}</p>`
}

function h1(text: string): string {
  return `<h1 style="color:#ffffff;font-size:20px;font-weight:800;margin:0 0 16px;">${text}</h1>`
}

export function welcomeEmail(firstName: string) {
  const html = shell(
    `${h1(`Bienvenue ${firstName} 👋`)}
     ${p("Votre compte Conforva est prêt. Deux minutes suffisent pour lancer votre première veille concurrentielle :")}
     ${p("1️⃣ Ajoutez un concurrent (son site, sa plateforme)<br>2️⃣ Ajoutez l'URL d'un de ses produits — le prix est récupéré immédiatement<br>3️⃣ Recevez votre premier rapport IA lundi prochain")}`,
    "Ajouter mon premier concurrent",
    "/dashboard/competitors/new"
  )
  return {
    subject: "Bienvenue sur Conforva — lancez votre veille en 2 minutes",
    html,
    text: `Bienvenue ${firstName} !\n\nVotre compte Conforva est prêt. Ajoutez un concurrent puis un produit pour démarrer : https://conforva.com/dashboard/competitors/new`,
  }
}

export function day3NudgeEmail(firstName: string) {
  const html = shell(
    `${h1(`${firstName}, vos concurrents ne se surveillent pas tout seuls`)}
     ${p("Vous vous êtes inscrit il y a 3 jours mais aucun concurrent n'est encore suivi sur votre compte.")}
     ${p("Sans concurrent ajouté, Conforva ne peut rien surveiller pour vous — c'est le seul prérequis. Ça prend moins de 2 minutes.")}`,
    "Ajouter un concurrent maintenant",
    "/dashboard/competitors/new"
  )
  return {
    subject: "Vous n'avez pas encore lancé votre veille",
    html,
    text: `${firstName}, vous êtes inscrit depuis 3 jours mais aucun concurrent n'est suivi. Ajoutez-en un : https://conforva.com/dashboard/competitors/new`,
  }
}

export function day7TipsEmail(firstName: string) {
  const html = shell(
    `${h1(`${firstName}, 3 astuces pour tirer le meilleur de Conforva`)}
     ${p("Une semaine après votre inscription, voici comment les meilleurs utilisateurs exploitent Conforva :")}
     ${p("<strong>1. Configurez des alertes à seuil</strong> — soyez notifié uniquement quand un prix bouge de plus de 5%, pas à chaque centime.<br><br><strong>2. Ajoutez vos produits phares en priorité</strong> — mieux vaut bien suivre 10 produits stratégiques que 50 produits secondaires.<br><br><strong>3. Lisez votre rapport IA du lundi</strong> — il vous dit exactement quoi ajuster, pas juste ce qui a changé.")}`,
    "Voir mon tableau de bord",
    "/dashboard"
  )
  return {
    subject: "3 astuces pour tirer le meilleur de Conforva",
    html,
    text: `${firstName}, voici 3 astuces : configurez des alertes à seuil, priorisez vos produits phares, lisez votre rapport IA du lundi. https://conforva.com/dashboard`,
  }
}

export function day13UpgradeNudgeEmail(firstName: string) {
  const html = shell(
    `${h1(`${firstName}, prêt à passer à la vitesse supérieure ?`)}
     ${p("Ça fait presque deux semaines que vous utilisez Conforva. Le plan Starter débloque le suivi de davantage de concurrents et de produits, ainsi que des alertes automatiques par email.")}
     ${p("Aucune interruption si vous ne changez rien — votre compte gratuit continue de fonctionner normalement.")}`,
    "Voir les plans",
    "/dashboard/billing"
  )
  return {
    subject: "Passez à la vitesse supérieure avec Conforva Starter",
    html,
    text: `${firstName}, découvrez le plan Starter pour suivre plus de concurrents et recevoir des alertes automatiques : https://conforva.com/dashboard/billing`,
  }
}
