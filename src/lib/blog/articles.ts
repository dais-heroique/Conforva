export interface BlogSection {
  heading?: string
  body: string[]
}

export interface BlogArticle {
  slug: string
  title: string
  description: string
  keywords: string[]
  publishedAt: string
  updatedAt?: string
  readingTime: number
  category: string
  intro: string
  sections: BlogSection[]
  conclusion: string
  cta: { heading: string; text: string; button: string; href: string }
}

export const ARTICLES: BlogArticle[] = [
  {
    slug: "gpsr-guide-complet-ecommerçants",
    title: "GPSR 2025 : guide complet pour les e-commerçants vendant dans l'UE",
    description: "Tout ce que vous devez savoir sur le règlement GPSR (UE) 2023/988 : qui est concerné, quelles obligations, quels documents, quelles sanctions. Guide pratique pour vendeurs en ligne.",
    keywords: ["GPSR e-commerçant", "règlement UE 2023/988", "conformité GPSR", "GPSR vendeur en ligne", "obligations GPSR"],
    publishedAt: "2025-01-15",
    readingTime: 8,
    category: "Réglementation",
    intro: "Depuis le 13 décembre 2024, le règlement (UE) 2023/988 sur la sécurité générale des produits — connu sous le nom de GPSR — est entré pleinement en application. Pour les e-commerçants vendant sur Amazon, Shopify, ou leur propre boutique, les règles ont changé de manière significative. Ce guide vous explique exactement ce que vous devez faire.",
    sections: [
      {
        heading: "Qu'est-ce que le GPSR exactement ?",
        body: [
          "Le GPSR (General Product Safety Regulation) est le règlement (UE) 2023/988, adopté le 10 mai 2023 et applicable depuis le 13 décembre 2024. Il remplace l'ancienne directive sur la sécurité générale des produits (2001/95/CE), qui datait de plus de 20 ans.",
          "Sa portée est considérable : il s'applique à tous les produits de consommation non alimentaires vendus dans l'Union Européenne, qu'ils soient vendus en magasin physique ou en ligne, et peu importe l'origine géographique du vendeur. Un dropshipper basé aux États-Unis ou en Chine, qui vend à des consommateurs français via Amazon ou Shopify, est soumis au GPSR.",
          "Le GPSR introduit également des obligations explicites pour les places de marché en ligne (Amazon, Etsy, OTTO, etc.) qui deviennent responsables de la conformité des vendeurs tiers sur leurs plateformes.",
        ],
      },
      {
        heading: "Qui est concerné par le GPSR ?",
        body: [
          "Le règlement distingue plusieurs rôles dans la chaîne de mise sur le marché, chacun avec ses propres obligations :",
          "**Le fabricant** : celui qui conçoit et produit le produit, ou qui le fait fabriquer et le commercialise sous sa marque. Il est responsable de l'intégralité de la conformité et doit établir le dossier technique et la déclaration de conformité.",
          "**L'importateur** : toute personne physique ou morale établie dans l'UE qui met sur le marché européen un produit fabriqué hors UE. Si vous importez des produits de Chine pour les vendre en Europe, vous êtes importateur.",
          "**Le distributeur** : toute personne de la chaîne d'approvisionnement qui met à disposition des produits sur le marché, à l'exception du fabricant et de l'importateur. Les dropshippers, même sans stock, sont généralement considérés comme distributeurs.",
          "**L'opérateur d'exécution** (nouveau dans le GPSR) : les prestataires logistiques type Amazon FBA qui stockent, emballent et expédient des produits pour le compte de tiers.",
        ],
      },
      {
        heading: "Les 5 documents obligatoires",
        body: [
          "Le GPSR impose plusieurs documents pour chaque produit mis sur le marché européen :",
          "**1. Le dossier technique (Article 22)** : le document central du GPSR. Il doit contenir la description complète du produit, ses dessins et plans techniques, la liste des normes appliquées, l'analyse de risque complète (méthodologie ISO 12100), les résultats de tests, les instructions d'utilisation et l'étiquetage. Il doit être conservé 10 ans à compter de la mise sur le marché.",
          "**2. L'analyse de risque** : partie intégrante du dossier technique, elle identifie chaque danger potentiel du produit (mécanique, thermique, électrique, chimique, etc.), évalue la probabilité et la gravité de chaque risque, et documente les mesures de mitigation mises en place.",
          "**3. La déclaration UE de conformité (Article 24)** : document officiel signé par le fabricant ou son représentant légal, attestant que le produit respecte toutes les exigences applicables. Elle doit être disponible à la demande des autorités.",
          "**4. L'étiquetage de sécurité (Article 9)** : les avertissements de sécurité doivent apparaître dans la langue du pays de vente. Pour un produit vendu en Allemagne, en France et en Italie, les étiquettes doivent être dans ces trois langues.",
          "**5. Les informations sur la Personne Responsable EU (Article 16)** : pour les fabricants établis hors UE, les coordonnées complètes de la personne responsable doivent figurer sur le produit ou son emballage.",
        ],
      },
      {
        heading: "La Personne Responsable EU : obligatoire pour tous les vendeurs hors UE",
        body: [
          "L'Article 16 du GPSR est souvent celui qui surprend le plus les vendeurs non-européens. Il impose que tout produit mis sur le marché EU par un fabricant hors UE ait un représentant légal établi dans l'Union Européenne.",
          "Cette personne — ou cette société — doit être joignable par les autorités de surveillance du marché européennes. Elle peut être un prestataire de services spécialisé, un importateur européen, ou même une société que vous créez en Europe.",
          "Pour les vendeurs Amazon FBA qui sourcent depuis la Chine, l'Asie du Sud-Est ou les États-Unis : Amazon EU exige déjà la désignation d'une personne responsable pour chaque ASIN vendu sur ses places de marché européennes (Amazon.fr, Amazon.de, Amazon.it, etc.). Sans cette désignation documentée, votre annonce peut être suspendue.",
        ],
      },
      {
        heading: "Sanctions et risques en cas de non-conformité",
        body: [
          "Les autorités de surveillance du marché européennes — la DGCCRF en France, le BSI en Allemagne, etc. — ont des pouvoirs renforcés sous le GPSR. Elles peuvent :",
          "Ordonner le retrait immédiat du produit du marché ou son rappel auprès des consommateurs. Bloquer les importations en douane si la documentation est absente ou insuffisante. Imposer des amendes administratives qui peuvent atteindre des montants significatifs selon la législation nationale de chaque État membre.",
          "Au-delà des sanctions réglementaires directes, la non-conformité entraîne des conséquences commerciales immédiates : suspension des annonces sur Amazon EU et les autres places de marché, blocage des livraisons, et en cas d'accident impliquant un produit non conforme, une responsabilité civile et pénale aggravée pour le vendeur.",
        ],
      },
      {
        heading: "Combien de temps pour constituer un dossier technique ?",
        body: [
          "Traditionnellement, constituer un dossier technique GPSR complet prenait entre 2 et 5 jours de travail pour un professionnel non spécialisé, ou nécessitait de faire appel à un expert en conformité (coût : 500 à 2 000 € par référence). Pour un catalogue de 50 produits, cela représentait un investissement de temps ou d'argent considérable.",
          "Avec des outils comme Conforva, le même dossier peut être généré en 5 à 10 minutes par référence : l'IA structure l'analyse de risque selon ISO 12100, identifie les normes harmonisées applicables, et génère les 15 sections requises du dossier technique. L'utilisateur n'a plus qu'à relire, compléter avec ses données réelles et signer.",
        ],
      },
    ],
    conclusion: "Le GPSR est une réalité depuis décembre 2024. Pour les e-commerçants qui vendent en Europe, la mise en conformité n'est plus optionnelle — c'est un prérequis pour opérer légalement sur le marché européen, maintenir ses annonces sur Amazon, et éviter des responsabilités en cas d'incident produit. La bonne nouvelle : les outils disponibles en 2025 rendent cette conformité accessible à tous, même sans expertise juridique ou technique préalable.",
    cta: {
      heading: "Générez votre premier dossier GPSR gratuitement",
      text: "Créez votre compte Conforva — aucune carte bancaire requise. Votre premier dossier technique complet est disponible immédiatement.",
      button: "Commencer gratuitement",
      href: "/auth/login",
    },
  },
  {
    slug: "gpsr-amazon-fba-guide",
    title: "Amazon FBA et GPSR : ce que chaque vendeur doit savoir en 2025",
    description: "Amazon suspend les annonces sans conformité GPSR. Découvrez exactement ce qu'Amazon exige (personne responsable EU, dossier technique) et comment mettre vos ASINs en conformité rapidement.",
    keywords: ["GPSR Amazon FBA", "Amazon personne responsable EU", "suspension Amazon GPSR", "conformité Amazon Europe", "ASIN conformité GPSR"],
    publishedAt: "2025-02-10",
    readingTime: 7,
    category: "Amazon FBA",
    intro: "Si vous vendez sur Amazon.fr, Amazon.de, Amazon.it ou toute autre place de marché Amazon EU, le GPSR vous concerne directement. Amazon a commencé à suspendre les annonces non conformes dès le début 2025. Ce guide vous explique exactement ce qu'Amazon exige et comment y répondre efficacement.",
    sections: [
      {
        heading: "Pourquoi Amazon exige la conformité GPSR",
        body: [
          "Amazon EU n'est pas seulement tenu de respecter les lois européennes — le GPSR l'y oblige directement. En tant que place de marché, Amazon est désormais considéré comme un « opérateur de marché en ligne » au sens du règlement (UE) 2023/988. À ce titre, Amazon a l'obligation légale de s'assurer que les produits vendus sur sa plateforme respectent les exigences de sécurité.",
          "Concrètement, cela signifie qu'Amazon audite activement les annonces et peut suspendre un ASIN qui ne dispose pas de la documentation GPSR requise. Les vendeurs reçoivent en général une notification par email avec un délai de mise en conformité — mais parfois la suspension intervient sans préavis.",
        ],
      },
      {
        heading: "Ce qu'Amazon exige concrètement",
        body: [
          "Amazon EU exige principalement deux éléments pour chaque ASIN dans les catégories concernées :",
          "**La désignation d'une Personne Responsable EU** : les coordonnées complètes (nom ou raison sociale, adresse physique dans un État membre de l'UE, numéro de téléphone et adresse email) doivent être renseignées dans Seller Central et, selon les catégories, figurer sur le produit ou son emballage. C'est souvent l'élément bloquant pour les vendeurs basés hors UE.",
          "**La documentation de conformité** : selon la catégorie du produit, Amazon peut demander à voir le dossier technique, les certificats de test, la déclaration de conformité ou des photos de l'étiquetage. Ces documents sont à uploader dans Seller Central dans la section « Compliance ».",
          "En pratique, Amazon vérifie en priorité les catégories à risque : jouets (EN 71), puériculture, électronique, articles pour enfants, éclairage, et tout produit pouvant entrer en contact avec des enfants de moins de 14 ans.",
        ],
      },
      {
        heading: "La Personne Responsable EU pour Amazon FBA : les options",
        body: [
          "Pour un vendeur basé hors de l'UE, trouver une personne responsable EU est souvent la première étape. Voici les options disponibles :",
          "**Option 1 — Un prestataire spécialisé** : il existe des sociétés qui proposent le service de « EU Responsible Person » pour les vendeurs Amazon non-européens. Les tarifs varient de 100 à 500 €/an par marque. Ces prestataires enregistrent leur adresse comme adresse de contact et redirigent les éventuelles demandes des autorités.",
          "**Option 2 — Votre importateur européen** : si vous travaillez avec un importateur ou un distributeur établi dans l'UE, celui-ci peut assumer ce rôle. Il doit toutefois être conscient des responsabilités légales associées.",
          "**Option 3 — Créer une entité en Europe** : pour les vendeurs qui ont un volume significatif, créer une SAS, SARL, GmbH ou autre forme juridique en Europe permet de gérer directement la conformité et la responsabilité.",
          "Quelle que soit l'option choisie, les coordonnées de la personne responsable doivent être à jour dans Seller Central et sur les produits concernés.",
        ],
      },
      {
        heading: "Les délais et conséquences d'une suspension Amazon",
        body: [
          "Une suspension ASIN pour non-conformité GPSR peut intervenir de plusieurs façons : vérification proactive d'Amazon, plainte d'un client, signalement d'un concurrent, ou contrôle d'une autorité nationale de surveillance du marché.",
          "Une fois un ASIN suspendu, la procédure de réactivation nécessite de soumettre la documentation demandée via Seller Central. Les délais de traitement par Amazon varient de quelques jours à plusieurs semaines selon les files d'attente. Pendant ce temps, l'annonce est invisible et les ventes à l'arrêt.",
          "La prévention reste donc de loin préférable au traitement des suspensions. Constituer son dossier GPSR avant d'être contacté par Amazon est la démarche recommandée.",
        ],
      },
      {
        heading: "Checklist GPSR pour chaque ASIN Amazon EU",
        body: [
          "Pour chaque référence produit vendue sur Amazon EU, vérifiez que vous disposez de :",
          "✓ Un dossier technique complet (15 sections, Art. 22 GPSR) conservé pendant 10 ans",
          "✓ Une analyse de risque documentée (ISO 12100:2010)",
          "✓ Une déclaration UE de conformité signée (Art. 24 GPSR)",
          "✓ Les coordonnées d'une Personne Responsable EU (Art. 16 GPSR) renseignées dans Seller Central",
          "✓ Un étiquetage avec avertissements de sécurité dans les langues des pays de vente (Art. 9 GPSR)",
          "✓ Un numéro de modèle, référence ou lot permettant l'identification du produit",
        ],
      },
    ],
    conclusion: "Le GPSR sur Amazon EU est une réalité opérationnelle depuis début 2025. La bonne approche est d'anticiper : constituer les dossiers GPSR pour chaque ASIN avant d'être contacté par Amazon. Avec des outils adaptés, cette conformité ne prend plus que quelques minutes par référence — et elle protège à la fois vos annonces et votre responsabilité légale.",
    cta: {
      heading: "Mettez vos ASINs Amazon en conformité",
      text: "Générez les dossiers techniques GPSR pour vos produits Amazon EU en quelques minutes. Analyse de risque, dossier 15 sections, déclaration de conformité et étiquetage multilingue.",
      button: "Essayer gratuitement",
      href: "/auth/login",
    },
  },
  {
    slug: "dossier-technique-gpsr-guide",
    title: "Dossier technique GPSR (Article 22) : les 15 sections obligatoires expliquées",
    description: "Le dossier technique GPSR est le document central de la conformité. Découvrez ce que l'Article 22 du règlement (UE) 2023/988 impose dans chaque section, et comment le constituer efficacement.",
    keywords: ["dossier technique GPSR", "article 22 GPSR", "créer dossier technique", "dossier technique conformité", "contenu dossier technique GPSR"],
    publishedAt: "2025-02-28",
    readingTime: 9,
    category: "Documentation",
    intro: "Le dossier technique est la pièce maîtresse de la conformité GPSR. L'Article 22 du règlement (UE) 2023/988 en définit précisément le contenu — et sa conservation est obligatoire pendant 10 ans à compter de la mise sur le marché. Voici ce qu'il doit contenir, section par section.",
    sections: [
      {
        heading: "Pourquoi le dossier technique est obligatoire",
        body: [
          "Le dossier technique (Technical Documentation) sert de preuve que le produit a fait l'objet d'une évaluation de conformité sérieuse avant sa mise sur le marché. Il est la documentation principale que les autorités de surveillance du marché (DGCCRF en France, BSI en Allemagne, etc.) peuvent réclamer à tout moment.",
          "Sa conservation pendant 10 ans est une obligation légale. En cas d'incident, un accident ou un rappel de produit, l'absence de dossier technique constitue une preuve d'imprudence qui aggrave considérablement la responsabilité civile et pénale du fabricant ou de l'importateur.",
          "Le dossier doit être disponible en français ou dans la langue de l'État membre où le produit est commercialisé — ou en anglais si les autorités l'acceptent (variable selon les pays).",
        ],
      },
      {
        heading: "Les 15 sections du dossier technique GPSR",
        body: [
          "**Section 1 — Description générale du produit** : nom commercial, référence, numéro de modèle, description fonctionnelle, photos, dimensions, poids, couleurs disponibles. Cette section permet d'identifier le produit de manière non ambiguë.",
          "**Section 2 — Nomenclature des composants (BOM)** : liste détaillée de tous les matériaux et composants constitutifs du produit, avec leurs fournisseurs et références. Essentielle pour les analyses de risque chimique et les enquêtes de traçabilité.",
          "**Section 3 — Dessins techniques et schémas** : plans, vues éclatées, schémas électriques si applicable. Ne doivent pas nécessairement être des dessins CAO professionnels — des schémas annotés peuvent suffire pour des produits simples.",
          "**Section 4 — Réglementations et normes appliquées** : liste des règlements EU applicables au produit (GPSR, REACH, RoHS, etc.) et des normes harmonisées retenues pour démontrer la conformité. Pour les jouets : EN 71 séries. Pour l'électronique : EN 62368. Pour les bougies : EN 15494.",
          "**Section 5 — Analyse de risque (ISO 12100:2010)** : le cœur du dossier. Identification systématique de tous les dangers (mécanique, thermique, électrique, chimique, biologique, ergonomique), évaluation de la probabilité et de la gravité de chaque risque, et documentation des mesures de mitigation. Cette section suit la méthodologie ISO 12100:2010.",
          "**Section 6 — Résultats d'essais ou justifications alternatives** : rapports de tests réalisés en laboratoire (accrédité ISO 17025 de préférence), ou, pour les produits à faible risque, une justification technique expliquant pourquoi les tests ne sont pas nécessaires.",
          "**Section 7 — Usage prévu et usages prévisibles raisonnables** : description de l'utilisation normale du produit, mais aussi des usages prévisibles non prévus (enfants jouant avec un produit destiné aux adultes, usage en conditions extrêmes, etc.).",
          "**Section 8 — Population cible** : identification des utilisateurs finaux, notamment les groupes vulnérables (enfants, personnes âgées, personnes handicapées). Les produits destinés aux enfants ou pouvant être accessibles à des enfants ont des exigences renforcées.",
          "**Section 9 — Instructions d'utilisation et avertissements** : guide d'utilisation, instructions de montage, conditions de stockage, précautions d'emploi. Doivent être rédigés dans la ou les langues du pays de vente.",
          "**Section 10 — Étiquetage de sécurité** : avertissements obligatoires selon la catégorie du produit (ex. : « Attention — ne pas avaler. Tenir hors de portée des enfants de moins de 3 ans »), symboles et pictogrammes CLP si applicable.",
          "**Section 11 — Personne Responsable EU** : coordonnées complètes de la personne ou société responsable au sens de l'Article 16 GPSR. Obligatoire pour les fabricants établis hors UE.",
          "**Section 12 — Traçabilité et informations de mise sur le marché** : informations permettant de tracer la chaîne de distribution du produit : fournisseur, importateur, distributeurs, numéros de lot.",
          "**Section 13 — Conformité aux marchés tiers (si applicable)** : pour les produits vendus en dehors de l'UE, documentation de la conformité aux exigences des marchés cibles (CPSC pour les USA, UKCA pour le Royaume-Uni, CCC pour la Chine, etc.).",
          "**Section 14 — Historique des versions et révisions** : journal des modifications du produit ou de la documentation depuis la première mise sur le marché, avec dates et description des changements.",
          "**Section 15 — Déclaration UE de Conformité (référence)** : référence ou copie de la déclaration de conformité (Art. 24 GPSR) associée à ce dossier technique.",
        ],
      },
      {
        heading: "Dossier technique et résultats de tests : faut-il obligatoirement un laboratoire ?",
        body: [
          "Les tests de laboratoire ne sont pas systématiquement obligatoires pour tous les produits. Le GPSR permet de recourir à des « justifications alternatives » pour démontrer la conformité sans tests externes.",
          "Cependant, pour certaines catégories à risque élevé, les normes harmonisées imposent des tests spécifiques : jouets (EN 71 — tests de sécurité mécanique, chimique, inflammabilité), appareils électroniques (EN 62368 — sécurité électrique), produits en contact avec des enfants de moins de 3 ans, cosmétiques, etc.",
          "Pour les produits à faible risque (décoration, papeterie, textile basique, accessoires non électroniques), une analyse de risque documentée sans tests formels peut être suffisante. La décision doit être justifiée par écrit dans le dossier technique.",
        ],
      },
      {
        heading: "Durée de conservation : 10 ans, sans exception",
        body: [
          "L'Article 22 du GPSR est explicite : le dossier technique doit être conservé pendant 10 ans à compter de la date de mise sur le marché du produit. Cette durée s'applique au dernier exemplaire produit ou vendu.",
          "Cela signifie que si vous vendez un produit jusqu'en 2030, le dossier doit être conservable jusqu'en 2040. La conservation peut être numérique (recommandé) ou physique. Il est conseillé de conserver au minimum deux copies dans des locaux distincts ou sur des supports redondants.",
          "En cas de cession d'activité, les obligations de conservation sont transmises au successeur ou, à défaut, incombent à la dernière entreprise responsable de la mise sur le marché.",
        ],
      },
    ],
    conclusion: "Le dossier technique GPSR n'est pas une simple formalité administrative. C'est un document de fond qui prouve que votre produit a été évalué sérieusement avant d'être mis sur le marché. Sa qualité conditionne à la fois votre protection légale en cas d'incident et votre capacité à passer les contrôles douaniers et les audits des places de marché. Un dossier bien structuré, même généré avec l'aide d'outils IA, vaut infiniment mieux qu'une absence de documentation.",
    cta: {
      heading: "Générez votre dossier technique en quelques minutes",
      text: "Conforva structure automatiquement les 15 sections du dossier technique selon les exigences de l'Article 22 GPSR, avec l'analyse de risque ISO 12100 incluse.",
      button: "Créer mon dossier technique",
      href: "/auth/login",
    },
  },
  {
    slug: "personne-responsable-eu-guide",
    title: "Personne responsable EU (Article 16 GPSR) : guide complet pour les vendeurs hors UE",
    description: "L'Article 16 du GPSR impose une personne responsable EU pour tout fabricant hors UE. Qui est concerné, quelles sont ses obligations, comment la désigner et quel coût prévoir.",
    keywords: ["personne responsable EU", "article 16 GPSR", "représentant EU GPSR", "EU responsible person", "désigner personne responsable EU"],
    publishedAt: "2025-03-20",
    readingTime: 6,
    category: "Réglementation",
    intro: "L'Article 16 du règlement GPSR (UE) 2023/988 impose une exigence souvent méconnue mais cruciale : tout fabricant établi hors de l'Union Européenne doit désigner une « personne responsable » établie dans l'UE avant de pouvoir mettre ses produits sur le marché européen. Voici tout ce que vous devez savoir.",
    sections: [
      {
        heading: "Qui est la Personne Responsable EU ?",
        body: [
          "La Personne Responsable (PR EU) est un opérateur économique établi dans l'Union Européenne qui accepte formellement d'assumer les obligations réglementaires du fabricant non-européen vis-à-vis des autorités européennes de surveillance du marché.",
          "Elle sert de point de contact officiel pour les autorités nationales en cas de questions sur la sécurité d'un produit, d'enquête ou de procédure de rappel. Contrairement à ce qu'on pourrait penser, la PR EU n'est pas nécessairement une grande structure — il peut s'agir d'une société spécialisée dans ce service, d'un importateur européen, ou même d'une filiale créée par le fabricant.",
          "Le terme « responsable » peut prêter à confusion : la PR EU n'assume pas la responsabilité pénale du fabricant en cas de défaut de produit. Sa responsabilité se limite aux obligations documentaires : vérifier que la documentation GPSR est en ordre avant de mettre le produit sur le marché, et la mettre à disposition des autorités.",
        ],
      },
      {
        heading: "Qui doit désigner une Personne Responsable EU ?",
        body: [
          "L'obligation s'applique à tout fabricant dont le siège social est établi en dehors de l'Union Européenne. Concrètement, cela inclut :",
          "Les fabricants et marques basés en Chine, en Asie du Sud-Est, aux États-Unis, au Canada, en Australie — bref, tout pays hors UE et hors Espace Économique Européen.",
          "Important : le Royaume-Uni est hors UE depuis le Brexit. Les fabricants britanniques vendant en EU doivent également désigner une PR EU (séparée de leur représentant UKCA pour le marché britannique).",
          "Si vous êtes basé en France, en Allemagne, en Espagne ou dans un autre État membre de l'UE, vous n'avez pas besoin de PR EU — vous assumez directement les obligations en tant que fabricant ou importateur EU.",
        ],
      },
      {
        heading: "Les obligations concrètes de la Personne Responsable EU",
        body: [
          "Selon l'Article 16(3) du GPSR, la PR EU doit s'acquitter des missions suivantes :",
          "**Vérification de la documentation** : s'assurer que le dossier technique et la déclaration UE de conformité ont été établis par le fabricant et qu'ils sont conformes aux exigences du GPSR.",
          "**Conservation des documents** : conserver une copie de la déclaration de conformité et veiller à ce que le dossier technique soit accessible pendant 10 ans.",
          "**Point de contact réglementaire** : être joignable par les autorités nationales et leur communiquer, sur demande, la documentation requise dans un délai raisonnable.",
          "**Actions correctives** : en cas de risque identifié, coopérer avec les autorités et prendre les mesures correctives nécessaires (rappel, retrait du marché, correction de l'étiquetage).",
          "**Mention obligatoire** : les coordonnées de la PR EU (nom/raison sociale, adresse, email, téléphone) doivent figurer sur le produit, son emballage ou la documentation jointe.",
        ],
      },
      {
        heading: "Comment désigner une Personne Responsable EU : les options",
        body: [
          "**Option 1 — Prestataires de service spécialisés (EU Responsible Person services)** : des sociétés proposent ce service moyennant un abonnement annuel. Le tarif varie généralement de 150 à 500 € par an par marque, selon le prestataire et le volume de produits. C'est l'option la plus simple pour les petits vendeurs.",
          "**Option 2 — Votre importateur ou distributeur européen** : si vous avez un partenaire logistique ou commercial en Europe, il peut assumer le rôle de PR EU. Cela nécessite un accord contractuel explicite et que votre partenaire soit informé de ses obligations.",
          "**Option 3 — Créer une entité européenne** : pour les vendeurs ayant un volume significatif (plusieurs millions d'euros de ventes EU annuelles), créer une SAS en France, une GmbH en Allemagne ou une Ltd en Irlande peut être pertinent. Cette entité sera votre PR EU et pourra également assumer d'autres fonctions commerciales.",
          "Quelle que soit l'option, la désignation doit être formalisée par un document contractuel entre le fabricant et la PR EU, précisant les produits concernés, les marchés couverts et les obligations respectives.",
        ],
      },
      {
        heading: "Personne Responsable EU et Amazon : ce qu'Amazon exige exactement",
        body: [
          "Amazon EU a intégré l'exigence de PR EU dans ses politiques de conformité vendeur. Pour les catégories soumises au GPSR, Amazon demande :",
          "Que les coordonnées de la PR EU soient renseignées dans Seller Central (onglet Compte > Informations légales > Personne responsable).",
          "Que ces coordonnées soient également visibles sur le produit ou son emballage (étiquette, insertion dans le carton ou notice).",
          "Que la documentation soit uploadée dans la section Conformité de Seller Central pour les catégories à risque élevé.",
          "Amazon procède régulièrement à des audits et peut demander une mise à jour de la documentation. Une adresse email et un numéro de téléphone valides sont indispensables — les autorités ou Amazon doivent pouvoir joindre la PR EU dans des délais raisonnables.",
        ],
      },
    ],
    conclusion: "La désignation d'une Personne Responsable EU n'est pas une formalité optionnelle — c'est une condition légale préalable à la mise sur le marché EU pour tout fabricant non-européen. Si vous vendez sur Amazon EU sans l'avoir fait, vous opérez en dehors des exigences légales. La bonne nouvelle : le coût de cette conformité est modeste au regard des risques qu'elle permet d'éviter.",
    cta: {
      heading: "Documentez votre Personne Responsable EU",
      text: "Conforva inclut une section dédiée à la Personne Responsable EU dans chaque dossier technique généré. Renseignez les coordonnées une fois, elles s'intègrent dans tous vos documents.",
      button: "Documenter ma PR EU",
      href: "/auth/login",
    },
  },
  {
    slug: "gpsr-dropshipping-guide",
    title: "GPSR et dropshipping : êtes-vous vraiment concerné ? (Oui, et voici pourquoi)",
    description: "Le dropshipping ne vous exempte pas du GPSR. Découvrez pourquoi les dropshippers sont considérés comme distributeurs ou importateurs, et quelles obligations concrètes s'appliquent à votre activité.",
    keywords: ["GPSR dropshipping", "conformité dropshipping UE", "obligations dropshipping Europe", "dropshipping conformité produit"],
    publishedAt: "2025-04-05",
    readingTime: 6,
    category: "Cas d'usage",
    intro: "Un mythe circule dans les communautés dropshipping : « Je ne stocke pas le produit, je ne suis pas responsable ». C'est faux. Le règlement GPSR (UE) 2023/988 s'applique à vous même si vous faites du dropshipping pur. Voici pourquoi et ce que vous devez mettre en place.",
    sections: [
      {
        heading: "Le dropshipper est un « distributeur » au sens du GPSR",
        body: [
          "Le GPSR définit les rôles dans la chaîne de mise sur le marché de manière fonctionnelle, non logistique. Ce n'est pas le fait de posséder un stock ou d'expédier physiquement le colis qui détermine votre statut — c'est votre rôle commercial.",
          "Le « distributeur » au sens du GPSR est « toute personne physique ou morale de la chaîne d'approvisionnement, autre que le fabricant ou l'importateur, qui met un produit à disposition sur le marché ». Quand vous créez une fiche produit sur votre boutique Shopify ou sur Amazon, et qu'un consommateur européen l'achète, vous mettez ce produit « à disposition sur le marché EU » — vous êtes donc distributeur.",
          "Dans certains cas, notamment quand vous importez depuis la Chine (même si vous ne stockez pas), vous pouvez être qualifié d'importateur si votre fournisseur est établi hors EU et que vous êtes la première entité à faciliter l'entrée du produit sur le marché européen.",
        ],
      },
      {
        heading: "Ce que le GPSR impose aux distributeurs",
        body: [
          "En tant que distributeur, vos obligations au titre du GPSR sont moins étendues que celles du fabricant, mais elles sont réelles et engagent votre responsabilité :",
          "**Vérification de la conformité avant mise en vente** : vous devez vous assurer raisonnablement que le produit que vous vendez est conforme. Cela signifie demander à votre fournisseur la documentation GPSR (dossier technique, déclaration de conformité) avant de lister le produit.",
          "**Ne pas vendre si vous savez que le produit est dangereux** : si vous avez connaissance d'un défaut de sécurité ou si vous avez reçu des plaintes clients concernant la sécurité d'un produit, vous avez l'obligation de cesser la vente et d'informer le fabricant.",
          "**Étiquetage dans la langue du pays de vente** : même si vous ne fabriquez pas le produit, vous devez vous assurer que l'étiquetage de sécurité est présent dans la langue du consommateur.",
          "**Coopération avec les autorités** : si une autorité de surveillance du marché enquête sur un produit que vous vendez, vous devez coopérer et fournir la documentation dont vous disposez.",
        ],
      },
      {
        heading: "Le cas particulier du dropshipping depuis la Chine",
        body: [
          "La grande majorité des dropshippers s'approvisionnent auprès de fournisseurs chinois (AliExpress, CJdropshipping, Spocket avec des sources asiatiques, etc.). Dans ce cas, si vous vendez à des consommateurs européens, vous devez être particulièrement vigilant.",
          "En l'absence d'un importateur EU identifié dans la chaîne, vous pouvez être considéré comme l'importateur de facto — avec les obligations correspondantes plus lourdes. La démarche recommandée : demander systématiquement à votre fournisseur la documentation GPSR disponible, et vérifier que les produits que vous vendez disposent au minimum d'une déclaration de conformité et d'un dossier technique.",
          "Si votre fournisseur ne peut pas fournir ces documents, vous avez trois options : changer de fournisseur, constituer vous-même le dossier technique sur la base des informations produit disponibles, ou arrêter de vendre ce produit sur les marchés EU.",
        ],
      },
      {
        heading: "Les plateformes e-commerce et la conformité GPSR",
        body: [
          "Shopify, Amazon, Cdiscount, OTTO, Zalando — toutes les grandes plateformes de vente en EU ont commencé à intégrer les exigences GPSR dans leurs politiques vendeurs.",
          "Amazon est la plus stricte : elle exige la documentation GPSR et les coordonnées de la Personne Responsable EU directement dans Seller Central. Les annonces non conformes sont suspendues.",
          "Shopify ne vérifie pas directement la conformité, mais votre boutique est soumise aux lois des pays où vous livrez. Si vous vendez à des consommateurs français, la DGCCRF peut vous contrôler.",
          "Etsy, en tant que place de marché, est également soumise aux obligations de marketplace sous le GPSR et procède à des vérifications de conformité.",
        ],
      },
      {
        heading: "La réalité pratique : que faire concrètement si vous faites du dropshipping ?",
        body: [
          "**Étape 1 — Auditer votre catalogue** : identifiez les produits que vous vendez sur les marchés EU et classez-les par niveau de risque (produits pour enfants, électronique, produits chimiques = risque élevé ; décoration, papeterie, accessoires simples = risque moindre).",
          "**Étape 2 — Contacter vos fournisseurs** : demandez-leur les documents GPSR disponibles (déclaration de conformité, rapports de tests, fiche technique). Les bons fournisseurs sur AliExpress ou CJdropshipping ont souvent ces documents pour les produits populaires.",
          "**Étape 3 — Constituer la documentation manquante** : pour les produits où la documentation fournisseur est insuffisante, vous pouvez créer le dossier technique sur la base des informations dont vous disposez (description, matériaux, usage prévu). Des outils comme Conforva permettent de le faire en quelques minutes.",
          "**Étape 4 — Mettre à jour l'étiquetage** : vérifiez que les avertissements de sécurité sont présents dans les langues des pays où vous vendez. Pour les produits envoyés directement depuis le fournisseur, vous pouvez insérer un document de sécurité dans le colis.",
        ],
      },
    ],
    conclusion: "Le GPSR s'applique au dropshipping. Ignorer cette réalité expose votre activité à des suspensions de comptes sur les places de marché, à des amendes des autorités de surveillance, et à une responsabilité personnelle en cas d'accident impliquant un produit que vous avez commercialisé. La mise en conformité n'est pas nécessairement longue ni coûteuse — l'essentiel est d'avoir la documentation appropriée pour chaque produit vendu en EU.",
    cta: {
      heading: "Conformité GPSR pour votre catalogue dropshipping",
      text: "Importez vos produits depuis Shopify et générez les dossiers techniques GPSR en quelques minutes. Sans expertise juridique requise.",
      button: "Commencer gratuitement",
      href: "/auth/login",
    },
  },
]

export function getArticle(slug: string): BlogArticle | undefined {
  return ARTICLES.find(a => a.slug === slug)
}
