[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Modèle Comptable Excel (.xlsx) pour Agence de Voyages B2B & Calculateur de Rentabilité pour Tour Operator — Suivi des Règlements Financiers DMC | RT Vacations Balkan
<img width="1920" height="790" alt="image" src="https://github.com/user-attachments/assets/cb659a58-4e78-464d-bcee-5b144d34575d" />


**Le modèle comptable Excel pour agence de voyages B2B (`.xlsx`)** et le **calculateur gratuit de rentabilité pour Tour Operator accessible via le web** sont spécialement conçus pour les **Destination Management Companies (DMCs)**, les **tour operators réceptifs** et les **agences de voyages grossistes**. **RT Vacations Balkan** automatise le **calcul analytique des coûts de voyage par réservation**, l'**analyse de la marge brute par PAX**, le **suivi de l'ancienneté des comptes clients (AR)**, le **rapprochement des comptes fournisseurs (AP) locaux**, le **règlement multidevise FX (`EUR`, `BAM`, `USD`)** et le **reporting mensuel de compte de résultat et de trésorerie d'exploitation de l'agence de voyages** au sein d'un seul **tableur de règlements financiers de voyage** connecté — sans installer de lourd logiciel ERP de voyage ni payer d'abonnements SaaS récurrents.

Même avec un carnet de réservations de groupes bien rempli et un chiffre d'affaires facturé record, une **agence de voyages B2B** ou un **DMC réceptif** peut facilement perdre le contrôle financier s'il ne peut répondre à trois questions fondamentales de **comptabilité de gestion de voyage** :

- **Exactitude du calcul des coûts et de la marge par PAX :** Quels **voyages de groupes réceptifs**, **forfaits FIT sur mesure** ou **programmes MICE** génèrent réellement un bénéfice net après déduction des **listes de chambres d'hôtel, location d'autocars de charter, guides multilingues agréés, repas de groupe au restaurant, billets d'entrée aux parcs nationaux et frais de handling terrestre** ?
- **Règlements AR/AP B2B et exposition au risque de crédit :** Combien de liquidités ont réellement été encaissées auprès des **grossistes voyages B2B étrangers et des partenaires OTA**, et combien reste impayé dans les **dettes envers les fournisseurs d'hospitalité locaux** avant les dates de libération des chambres d'hôtel ?
- **Flux de trésorerie réalisé vs. bénéfice comptable sur papier :** L'activité de voyage génère-t-elle un **flux de trésorerie net d'exploitation positif**, ou se contente-t-elle d'accumuler du chiffre d'affaires B2B non encaissé tout en épuisant le fonds de roulement dans des **prépaiements anticipés aux fournisseurs** ?

Cette **trousse de gestion financière pour agence de voyages** unifie les **registres maître de réservations, les factures de vente B2B, les factures des fournisseurs terrestres, les journaux de paiements fractionnés et les frais généraux fixes de bureau (SG&A)** en un flux de travail automatisé de **compte de résultat de voyage et de reporting de liquidité bancaire**.

*Aucune inscription de compte. Aucune installation de logiciel. Tests financiers instantanés directement dans le navigateur, associés à un classeur Microsoft Excel hors ligne permanent et réutilisable pour une comptabilité de voyage mensuelle récurrente.*

> **Commencez dès aujourd'hui à auditer vos marges de voyage et votre trésorerie d'agence :**
>
> Utilisez la calculatrice interactive du navigateur pour une simulation instantanée des coûts de voyage et de trésorerie en session unique. Pour une comptabilité d'entreprise permanente, un rapprochement bancaire mensuel et un contrôle financier multi-réservations, téléchargez le classeur Microsoft Excel automatisé.
>
> - 🌐 **[Lancez la calculatrice gratuite en ligne de rentabilité et de trésorerie pour Tour Operator (application interactive dans le navigateur)](https://hyvoid.github.io/travel-agency-accounting-excel-template/)** — *Environnement de test en ligne instantané pour simuler les marges brutes par réservation, les acomptes B2B fractionnés et l'ancienneté AR/AP sans installer de fichiers.*
> - 📥 **[Téléchargez le modèle Excel réutilisable de comptabilité et de règlements financiers pour agence de voyages B2B (.xlsx)](https://theseusworkshop.com/l/qihgnj?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=travel-agency-accounting-excel-template)** — *Classeur tableur hors ligne complet propulsé par des formules natives Excel Dynamic Array (`XLOOKUP`, `FILTER`, `LET`) pour une comptabilité de voyage mensuelle permanente.*

---

## Matrice de base de la comptabilité et du suivi financier d'agence de voyages : des points de douleur aux solutions Excel automatisées

Plutôt que de jongler avec des **tableurs de calcul des coûts de voyage** déconnectés, des **journaux manuels de paiements d'hôtels** et des **vérifications réactives du solde bancaire**, ce cadre associe directement les **points de douleur financiers récurrents des agences de voyages** à des contrôles automatisés dans le tableur :

| Point de douleur financier voyage fréquent | Module comptable cible & catégorie de recherche | Comment ce modèle Excel pour agence de voyages automatise le contrôle |
| :--- | :--- | :--- |
| **Marges bénéficiaires par voyage et par PAX floues** | **Calcul analytique des coûts par réservation & calculateur de compte de résultat de voyage** | Déduit automatiquement les factures terrestres directes (hôtels, autocars de charter, guides, repas, billets d'entrée) des factures de vente B2B pour calculer en temps réel le **bénéfice brut par réservation**, la **marge brute (%)** et le **bénéfice net par passager (`PAX`)**. |
| **Perte de vue des acomptes clients partiels et des soldes en retard** | **Suivi de l'ancienneté des comptes clients (AR) B2B & du recouvrement** | Enregistre les acomptes initiaux de 30 % du voyage, les virements échelonnés et les encaissements de solde final au regard des enregistrements `Invoice ID` parents, en signalant les **créances B2B en retard** et les échéances de recouvrement à venir. |
| **Dates limites hôtelières manquées & fournisseurs terrestres impayés** | **Registre des comptes fournisseurs (AP) DMC & des dettes envers les fournisseurs** | Relie directement les factures des fournisseurs terrestres au `Booking ID`, en suivant les prépaiements partiels d'hôtels, les **obligations de paiement restantes envers les fournisseurs locaux** et les échéances de règlement à venir. |
| **Voyages de groupes rentables provoquant des crises de trésorerie soudaines** | **État mensuel des flux de trésorerie de l'agence de voyages & rapprochement de liquidité** | Sépare le bénéfice comptable des mouvements bancaires réels en déduisant les **factures fournisseurs payées** et les **frais généraux payés** strictement des **liquidités réellement encaissées auprès des clients B2B**. |
| **Frais généraux fixes de l'agence qui grignotent les marges des voyages de groupes** | **Tableau de bord du bénéfice d'exploitation net (EBITDA) & de la répartition des frais généraux SG&A** | Déduit les coûts d'exploitation mensuels fixes de l'agence (loyer du bureau, paie du personnel, stands de salons professionnels B2B, frais de virement bancaire) du bénéfice brut des voyages pour révéler le véritable **résultat d'exploitation net**. |
| **Dépendance aveugle aux acheteurs B2B à fort volume et faible marge** | **Analyses de rentabilité DMC multidimensionnelles (par destination, acheteur & commercial)** | Classe les **destinations de voyage réceptives**, les **acheteurs grossistes B2B étrangers** et les **responsables commerciaux voyage** selon leur contribution nette de marge et leur **risque de créances irrécouvrables**, plutôt que selon le chiffre d'affaires brut facturé. |

---

## Tutoriel pas à pas : configurer votre flux de comptabilité d'agence de voyages B2B et de calcul des coûts de voyage

Ce **flux de comptabilité pour tour operator B2B** est conçu pour un déploiement rapide : configurez une seule fois les paramètres financiers de votre agence, enregistrez les réservations et règlements par ordre chronologique, et laissez le **moteur automatisé de tableaux dynamiques Excel** générer en temps réel des **états de compte de résultat de voyage** et des **échéanciers d'ancienneté AR/AP**.

### Étape 1 : Configurer les taux de change FX multidevise et les paramètres de marge de l'agence
Ouvrez le module de configuration global pour définir votre **devise de reporting de base** (`EUR`, `BAM` ou `USD`), les **taux de conversion de change (`FX`) de référence**, la **marge brute cible des voyages (%)**, le **seuil d'alerte de retard AR (jours)** et les **budgets mensuels de revenus et de bénéfices** de l'agence. Remplissez les listes de validation maître pour les **clients B2B étrangers, fournisseurs terrestres locaux, destinations de voyage, types de forfaits et commerciaux**.
- 👉 *Essayez en direct :* **[Configurez des règles de devises et de marges d'exemple dans le bac à sable gratuit du calculateur en ligne](https://hyvoid.github.io/travel-agency-accounting-excel-template/)**

### Étape 2 : Enregistrer les réservations réceptives confirmées, les factures de vente B2B et les factures des fournisseurs terrestres
Attribuez un `Booking ID` unique à chaque voyage de groupe confirmé ou dossier FIT, en notant l'**acheteur grossiste B2B, l'itinéraire de destination, les dates de début et de fin du voyage, le nombre de passagers payants (`PAX`) et le responsable commercial assigné**. Saisissez les **factures B2B clients émises** ainsi que les **factures entrantes des hôtels, transports et guides** rattachées à ce même `Booking ID`. Lors de l'enregistrement d'un **acompte client partiel** ou d'une **tranche de prépaiement hôtelier**, ajoutez une nouvelle ligne dans le **Registre des règlements** plutôt que d'écraser le montant initial de la facture.
- 👉 *Essayez en direct :* **[Simulez le calcul des coûts de réservations et les saisies d'acomptes fractionnés dans l'application interactive du navigateur](https://hyvoid.github.io/travel-agency-accounting-excel-template/)**

### Étape 3 : Auditer les marges brutes des voyages, l'ancienneté AR/AP et la trésorerie mensuelle
Ouvrez le **moteur de calcul automatisé des réservations** pour examiner le bénéfice brut par voyage, les alertes d'écart par rapport à la marge cible, le bénéfice par PAX, les soldes d'acheteurs non encaissés et les dettes fournisseurs impayées. Basculez vers le **tableau de bord financier de direction voyage** pour suivre l'épuisement mensuel de trésorerie net, la rentabilité saisonnière des destinations et la fiabilité de paiement des acheteurs B2B.
- 👉 *Essayez en direct :* **[Aperçu en ligne du tableau de bord de direction DMC (compte de résultat et ancienneté AR/AP)](https://hyvoid.github.io/travel-agency-accounting-excel-template/)**

### Étape 4 : Passer du test web en session unique à la comptabilité Excel mensuelle réutilisable
Bien que le bac à sable du navigateur soit idéal pour une simulation instantanée en session unique, l'exploitation continue d'une agence de voyages exige un stockage de données persistant. Téléchargez le **classeur Microsoft Excel hors ligne réutilisable (`.xlsx`)** pour conserver des registres de transactions permanents sur plusieurs mois, effectuer des rapprochements bancaires hebdomadaires, mettre à jour le `Analysis Date` pour un **suivi en temps réel des factures en retard** et faire basculer le `Reporting Year` d'un exercice à l'autre.
- 👉 *Obtenez la trousse permanente :* **[Téléchargez le classeur Excel réutilisable de comptabilité pour agence de voyages B2B (.xlsx) pour des opérations mensuelles récurrentes](https://theseusworkshop.com/l/qihgnj?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=travel-agency-accounting-excel-template)**

---

## La logique métier et la méthodologie : résoudre les pièges de trésorerie et les angles morts de rentabilité des agences de voyages

*Rédigé dans un langage simple, sans jargon, pour les fondateurs d'agences de voyages, les concepteurs de voyages et les responsables d'exploitation DMC sans formation comptable formelle.*

Dans l'industrie touristique mondiale, des milliers de propriétaires d'agences de voyages très travailleurs tombent dans exactement le même piège commercial : **leur calendrier de départs est réservé à 100 %, leur équipe commerciale célèbre un chiffre d'affaires de réservations record, et pourtant le compte en banque de l'entreprise est constamment vide.**

Si vous avez déjà terminé un mois de haute saison chargé en vous demandant : *« Nous avons vendu 200 000 € de voyages — où est passé tout cet argent ? »*, vous vivez l'écart structurel entre le **chiffre d'affaires facturé**, le **bénéfice réel des voyages** et le **flux de trésorerie bancaire réel**.

```
[ Invoiced B2B Tour Sales ]  ≠  [ Real Tour Gross Profit ]  ≠  [ Actual Cash in Bank ]
   (What you billed)             (After land supplier bills)    (Collected receipts minus paid bills & rent)
```

Cette trousse d'outils a été conçue pour éliminer **six angles morts commerciaux cachés** qui font silencieusement faillite des agences de voyages pourtant prospères :

### 1. L'« illusion du chiffre d'affaires » (pourquoi un volume de réservations élevé ne signifie pas que vous gagnez de l'argent)
- **L'angle mort :** Vendre un voyage de groupe réceptif de 25 personnes dans les Balkans à un partenaire grossiste étranger pour **15 000 €** ressemble à une grande victoire commerciale. Les opérateurs non financiers considèrent instinctivement ces 15 000 € comme de l'argent gagné.
- **La réalité :** Avant que votre agence ne garde un seul euro, vous devez payer les blocs de chambres d'hôtels 4 étoiles, les autocars de charter longue distance, l'hébergement des chauffeurs, les guides de ville agréés, les repas de groupe au restaurant et les entrées aux musées. Si ces **coûts terrestres directs** totalisent **13 200 €**, votre bénéfice brut réel n'est que de **1 800 € (12 %)** — et c'est *avant* de payer le loyer du bureau, les logiciels ou les salaires du personnel.
- **Comment la trousse le corrige (*calcul analytique des coûts par réservation*) :** Chaque facture d'hôtel, note d'autocar et honoraires de guide est rattachée à un `Booking ID` spécifique. Le système déduit automatiquement tous les coûts terrestres directs du prix de vente B2B, vous montrant le bénéfice exact restant de chaque voyage *avant* que vous ne célébriez la vente.

### 2. Le piège de la « faillite rentable » (pourquoi le bénéfice sur papier ne peut pas payer les fournisseurs locaux)
- **L'angle mort :** Supposer que tant que chaque forfait de voyage est tarifé avec une saine marge bénéficiaire de 20 %, votre agence de voyages ne peut jamais manquer d'argent.
- **La réalité :** Dans le voyage B2B et l'exploitation d'un DMC, **le calendrier des liquidités est une question de survie**. Supposez qu'un voyage rapporte 2 500 € de bénéfice net. Cependant, votre partenaire B2B étranger ne verse qu'un **acompte de 20 % (3 000 €)** à la confirmation et paie les 80 % de solde restants 30 jours *après* le retour des voyageurs. Pendant ce temps, les hôtels et les compagnies d'autocars locaux exigent un **prépaiement de 100 % (10 500 €)** 14 jours avant l'arrivée du groupe. Bien que le voyage soit « rentable sur papier », il crée un **déficit de trésorerie immédiat de -7 500 €** sur votre compte bancaire. Multipliez cela par 12 groupes de haute saison en juillet, et une agence rentable se retrouve gelée par manque de liquidités.
- **Comment la trousse le corrige (*séparation entre bénéfice comptable et liquidité*) :** Le classeur sépare strictement le *« bénéfice comptable acquis »* des *« liquidités réelles en banque »*. En comparant les acomptes clients réellement reçus aux factures fournisseurs réellement payées, il vous avertit des déficits de fonds de roulement des semaines avant les dates limites hôtelières.

### 3. L'erreur de « distorsion du calendrier » (confondre dates de réservation, dates de paiement et dates de voyage)
- **L'angle mort :** Enregistrer les revenus et les coûts uniquement en fonction du mois où une facture est saisie ou où un virement bancaire a lieu.
- **La réalité :** Dans le tourisme, une seule réservation s'étend sur plusieurs mois : un acheteur B2B confirme un groupe et verse un acompte en **janvier**, votre agence paie les prépaiements hôteliers en **mai**, les passagers voyagent réellement en **août**, et le solde final arrive en **septembre**. Si vous mélangez ces dates dans un tableur rudimentaire, janvier paraît extrêmement rentable, mai ressemble à une perte financière catastrophique et août affiche des marges faussées — rendant impossible le jugement des saisons de voyage réellement les plus performantes.
- **Comment la trousse le corrige (*attribution à double chronologie*) :** Le moteur de calcul ancre le **compte de résultat de voyage (revenus et coûts directs)** au **mois de voyage réel** pour que la rentabilité saisonnière soit fiable à 100 %, tout en suivant simultanément la **trésorerie** à la date exacte où l'argent entre ou sort de votre compte bancaire.

### 4. Le chaos de l'« écrasement des paiements partiels » (piste d'audit perdue sur les acomptes fractionnés)
- **L'angle mort :** Quand un client étranger verse un acompte de 4 000 € sur une facture de 10 000 €, beaucoup de comptables d'agence cliquent simplement dans leur cellule Excel et changent le montant de la facture de 10 000 € à 6 000 €.
- **La réalité :** Deux mois plus tard, lorsqu'un litige de facturation survient à propos de frais de virement insuffisamment réglés ou d'une seconde tranche, l'historique initial de la facture a disparu. Personne ne peut prouver la valeur initiale du contrat, quand les paiements partiels sont arrivés, ni quelles factures sont légalement en retard.
- **Comment la trousse le corrige (*ancienneté AR/AP sur registre immuable*) :** Les factures de vente B2B et les factures fournisseurs initiales ne sont jamais écrasées. Chaque acompte, tranche échelonnée ou paiement de solde est enregistré comme une transaction horodatée dans le **Registre des règlements**, calculant automatiquement les soldes impayés restants et surlignant les comptes en retard.

### 5. La « fuite de change multidevise » (érosion silencieuse des marges au-delà des frontières)
- **L'angle mort :** Établir des devis en `USD` pour un tour operator américain ou britannique, encaisser les règlements bancaires en `EUR` et payer les fournisseurs d'hospitalité balkaniques locaux en `BAM` (marks convertibles bosniens) avec des calculs mentaux approximatifs ou des taux de change périmés.
- **La réalité :** Les écarts de conversion non couverts et les taux de change incohérents dans les tableurs grignotent silencieusement **2 % à 5 % de la marge nette d'un tour operator** — effaçant souvent un tiers du bénéfice net réel de l'agence sans que personne ne le remarque.
- **Comment la trousse le corrige (*normalisation des changes au niveau des transactions*) :** Chaque facture, note et paiement est enregistré dans sa devise de transaction d'origine puis automatiquement ramené à la devise de reporting de base unique de votre agence, avec prise en charge intégrée du verrouillage des taux de change historiques au jour exact du règlement.

### 6. Le mirage du « commercial vedette et du meilleur client » (récompenser des volumes non encaissés ou à faible marge)
- **L'angle mort :** Verser des commissions commerciales aux responsables de comptes réceptifs ou accorder des tarifs préférentiels aux partenaires grossistes B2B uniquement parce qu'ils génèrent le volume de réservations brut le plus élevé.
- **La réalité :** Votre acheteur B2B au volume le plus élevé peut exiger d'importantes remises qui compressent la marge brute à 6 %, tout en retardant chroniquement ses paiements finaux de 90 jours. Pendant ce temps, un partenaire de taille moyenne apporte des marges de 22 % et paie 100 % d'avance. Récompenser le volume brut de ventes pousse votre équipe à vendre des voyages qui drainent la trésorerie de l'entreprise.
- **Comment la trousse le corrige (*analyses de contribution ajustées du risque*) :** Le tableau de bord de direction évalue côte à côte les **revenus facturés**, les **marges brutes réalisées** et **l'exposition aux créances AR en retard impayées** par client, destination et commercial — montrant à la direction qui apporte réellement des *liquidités rentables et encaissées* à l'agence.

---

## Problèmes financiers courants des agences de voyages résolus : tableurs manuels vs. modèle automatisé de règlements B2B

| Domaine opérationnel de l'agence de voyages | Tableurs manuels fragiles & journaux déconnectés (sans cet outil) | Cadre automatisé de rentabilité et de règlements de voyages B2B (avec cet outil) |
| :--- | :--- | :--- |
| **Calcul analytique des forfaits de voyage & marge par PAX** | Le chiffre d'affaires brut est célébré sans déduction des **réalisations finales des listes de chambres, indemnités des chauffeurs, honoraires des guides et billets d'entrée**. | Les factures terrestres directes sont rattachées à des enregistrements `Booking ID` précis, calculant le **bénéfice brut, la marge % et le bénéfice par PAX exacts pour chaque réservation**. |
| **Rapprochement des acomptes B2B & des soldes fractionnés** | Les acomptes de voyage partiels, virements internationaux et soldes finaux écrasent des cellules statiques, provoquant des **litiges de rapprochement AR** avec les grossistes étrangers. | Chaque encaissement client est journalisé dans un registre de paiements immuable et agrégé au regard de son `Invoice ID` parent pour une **ancienneté AR B2B en temps réel**. |
| **Contrôle des AP des fournisseurs d'hospitalité locaux** | Les dates de libération des hôtels et les prépaiements d'autocars restent enfouis dans des fils de courriels, aveuglant les équipes financières sur les **échéances fournisseurs à venir et les dettes AP impayées**. | Les factures des fournisseurs terrestres et les paiements partiels aux fournisseurs sont directement liés aux réservations, générant des **alertes automatiques de dettes AP échues prochainement ou en retard**. |
| **Fonds de roulement en haute saison & trésorerie** | La direction assimile la marge comptable positive des voyages à la liquidité bancaire, déclenchant des **crises de trésorerie lors du paiement des prépaiements anticipés aux fournisseurs terrestres**. | Les **encaissements clients reçus, les paiements fournisseurs décaissés et les frais généraux SG&A payés** sont rapprochés séparément du compte de résultat comptable des réservations. |
| **Comptabilité multidevise (`EUR`/`BAM`/`USD`)** | Les factures en devises et les notes des fournisseurs locaux sont additionnées avec des taux de change mentaux incohérents, masquant le **glissement de conversion FX**. | Toutes les écritures multidevise sont normalisées dans une devise de reporting de base unifiée avec **verrouillage historique des taux de change au niveau des transactions**. |
| **Risque de crédit B2B & évaluation des commerciaux** | Les partenaires étrangers et les commerciaux sont jugés uniquement sur la valeur des réservations confirmées, ignorant la **dilution des marges et les mauvais payeurs chroniques**. | Les tableaux de bord multidimensionnels classent les **destinations, acheteurs B2B et commerciaux** selon le bénéfice brut net ainsi que le **risque de créances en retard impayées**. |

---

## À qui cela s'adresse : rôles cibles de l'industrie du voyage & cas d'usage spécifiques du modèle

Ce cadre est conçu pour les professionnels du tourisme à la recherche de **modèles de comptabilité pour agence de voyages** spécialisés et non surchargés, de **tableurs de middle-office DMC** et de **calculateurs de rentabilité pour tour operator** :

- **Destination Management Companies (DMCs) & tour operators réceptifs (`DMC Tour Costing & Supplier Settlement Template`) :** Conçu pour les équipes réceptives coordonnant des voyages de groupes de plusieurs jours, des arrangements terrestres FIT et des programmes MICE qui doivent rapprocher les factures grossistes étrangères des factures locales fragmentées d'hôtels, de transports et de guides.
- **Propriétaires, fondateurs & directeurs généraux d'agences de voyages (`Travel Agency Executive P&L & Cash Flow Dashboard`) :** Pensé pour les dirigeants d'agence cherchant un centre de commandement en temps réel pour suivre la marge d'exploitation nette, l'exposition du fonds de roulement, les seuils de point mort par PAX et les écarts budgétaires saisonniers sans recruter un CFO à temps plein.
- **Comptables, teneurs de livres & contrôleurs financiers d'agences de voyages (`Travel Agency AR/AP Aging & Bank Reconciliation Excel Tracker`) :** Conçu pour le personnel financier back-office ayant besoin de registres relationnels structurés, d'ancienneté automatisée des factures (`Current`, `Due Soon`, `Overdue`), de suivi des paiements fractionnés et de normalisation multidevise (`EUR`, `BAM`, `USD`).
- **Responsables commerciaux B2B, concepteurs de voyages & directeurs produits (`Tour Operator Margin Calculator & Client Contribution Tracker`) :** Idéal pour les équipes commerciales auditant quelles destinations de voyage, gammes de forfaits et acheteurs B2B étrangers délivrent des revenus à forte marge encaissés à temps, face à l'exposition aux créances irrécouvrables.
- **Petites et moyennes entreprises de voyage (PME) & tour operators boutique (`Free Travel ERP & Mid-Office Accounting Software Alternative`) :** Adapté aux agences en croissance qui ont dépassé les tableurs manuels désordonnés mais veulent éviter les systèmes ERP de voyage hérités à plus de 500 $/mois et les logiciels comptables complexes à partie double.

*Note de périmètre :* Cette trousse fonctionne comme un **système de comptabilité de gestion opérationnelle, de calcul analytique des voyages et de contrôle financier AR/AP**. Elle complète — sans les remplacer — les portails gouvernementaux de déclaration fiscale, les caisses enregistreuses fiscales ou les grands livres d'audit certifiés.

---

## Scénarios comptables réels de voyage B2B et de DMC : cas d'usage opérationnels de longue traîne

Pour illustrer le fonctionnement de ce **modèle de tableur pour agence de voyages B2B** dans les flux de travail touristiques quotidiens, voici quatre scénarios commerciaux à haute fréquence qu'il gère dès l'installation :

### Scénario 1 : Calcul des coûts d'un voyage de groupe réceptif plurinational & règlement FX multidevise
Un **DMC réceptif dans les Balkans** exploite un voyage de groupe plurinational de 10 jours à travers la Croatie, la Bosnie-Herzégovine et le Monténégro (avec des factures de fournisseurs locaux en `EUR` et `BAM`) vendu à un tour operator grossiste nord-américain facturé en `USD`. Le coordinateur d'exploitation utilise le **moteur de normalisation multidevise** pour verrouiller les taux de change historiques aux dates d'acompte, relier 14 factures distinctes d'hôtels, d'autocars de charter et de parcs nationaux à un seul `Booking ID`, et vérifier si le groupe terminé a atteint la **marge brute cible de 18 %** de l'agence.

### Scénario 2 : Prépaiements hôtliers d'avant-saison vs. contrôle du crédit des clients B2B
Trente jours avant les départs de groupes de l'été, les hôtels balnéaires côtiers locaux exigent des prépaiements non remboursables de 50 % des listes de chambres. En filtrant le **Registre d'ancienneté et de règlements AR/AP B2B**, le directeur général de l'agence repère trois partenaires voyages étrangers dont les acomptes initiaux dépassent l'échéance de 15 jours — suspendant immédiatement les paiements sortants aux fournisseurs et lançant un recouvrement de crédit ciblé avant que la trésorerie de l'agence ne devienne négative.

### Scénario 3 : Audit post-saison de la rentabilité des destinations & des partenaires grossistes
Lors des revues commerciales de fin d'année, le directeur commercial examine le **Tableau de bord de performance DMC multidimensionnel** et découvre que si le *partenaire grossiste A* a généré 150 000 € de volume brut de réservations, de fortes remises tarifaires et des retards de paiement chroniques n'ont produit qu'une marge brute de 8 % et une forte exposition aux créances irrécouvrables. Pendant ce temps, le *partenaire grossiste B* a généré 80 000 € de réservations avec une marge brute de 24 % et un règlement à 100 % dans les délais — remodelant directement les contrats d'allotement B2B et les paliers de commission de l'année suivante.

### Scénario 4 : Couverture des frais généraux fixes d'une agence de voyage boutique & modélisation du point mort par PAX
Une agence de voyage réceptive boutique supportant 6 500 € de frais généraux SG&A mensuels fixes (loyer du bureau, abonnements GDS/systèmes de réservation, paie du personnel, marketing de salons internationaux) utilise le **suivi mensuel du bénéfice d'exploitation et de la trésorerie** pour calculer combien de passagers payants (`PAX`) et de marge brute de voyage sont nécessaires chaque mois pour couvrir les charges fixes et atteindre les budgets annuels de revenu net.

---

## Pourquoi j'ai construit ce cadre financier de voyage B2B

Dans le tourisme B2B, le chiffre d'affaires brut de réservations est fréquemment confondu avec la santé financière réelle de l'entreprise.

Considérez un voyage de groupe réceptif vendu à un grossiste voyage international pour **12 000 €**. Sur un simple journal des ventes, la réservation paraît solide. Une fois que l'équipe d'exploitation finalise les listes de chambres, les autocars de charter, les guides multilingues, les repas de groupe et les entrées aux musées, les coûts terrestres directs atteignent **10 200 €** — laissant **1 800 € de bénéfice brut (une marge brute de 15 %)**.

Pourtant, l'analyse de marge n'est que la moitié de l'équation. Si l'acheteur étranger n'a versé que **6 000 €** d'acomptes alors que votre agence a déjà décaissé **8 000 €** de prépaiements fournisseurs, une réservation rentable draine activement **2 000 €** du fonds de roulement de votre entreprise.

J'ai construit **RT Vacations Balkan** autour d'un **raisonnement financier industrialisé** : transformer des feuilles de calcul de coûts déconnectées, des dossiers de factures manuels et des vérifications réactives de solde bancaire en un **modèle de comptabilité de gestion DMC** unifié. Il permet aux opérateurs de voyage de repérer tôt l'érosion des marges, d'imposer une discipline de crédit B2B, de planifier précisément les règlements fournisseurs et de développer des itinéraires de voyage rentables en toute confiance.

---

## Architecture technique & spécifications du classeur Excel

### Moteur de formules natif Excel Dynamic Array de Microsoft
Le classeur `.xlsx` téléchargeable est propulsé entièrement par de modernes **fonctions natives Excel Dynamic Array de Microsoft** (`FILTER`, `SUMIFS`, `XLOOKUP`, `LET`, `UNIQUE`). Il n'exige **aucune macro VBA**, évitant ainsi les fenêtres d'avertissement de sécurité, les échecs de compatibilité multiplateforme et la corruption fragile des formules par glissement de lignes.

### Règles de validation comptable intégrées & contrôles relationnels d'erreurs
Pour prévenir les erreurs de saisie comptable, le tableur applique de strictes **listes déroulantes de validation de données, contrôles relationnels de clés étrangères et indicateurs d'audit de diagnostic automatisés** :

| Champ du registre / zone de contrôle | Règle de validation comptable | Comportement de diagnostic automatisé du tableur |
| :--- | :--- | :--- |
| `Booking ID` (Registre maître) | Doit être 100 % unique dans le journal maître des réservations. | Déclenche une alerte de diagnostic `Duplicate ID` immédiate. |
| `Booking Status` | Limité aux états standardisés du cycle de vie du voyage (`Confirmed`, `Completed`, `Cancelled`). | Appliqué via une validation par liste déroulante verrouillée. |
| `Travel Start & End Dates` | Doivent être des dates calendaires chronologiquement valides. | Signale les formats de date invalides ou les plages de voyage inversées. |
| `Passenger Count (PAX)` | Doit être un entier positif représentant les voyageurs payants. | La validation des entrées bloque les valeurs négatives ou textuelles. |
| `Customer Invoice → Booking ID` | La clé étrangère relationnelle doit exister dans le registre maître des réservations. | Déclenche l'avertissement `Orphaned / Invalid Booking ID`. |
| `Supplier Bill → Booking ID` | La clé étrangère relationnelle doit exister dans le registre maître des réservations. | Déclenche l'avertissement `Orphaned / Invalid Booking ID`. |
| `Transaction Currency` | Doit correspondre à un code de devise ISO configuré (`EUR`, `BAM`, `USD`). | Contrôlé via un menu déroulant lié aux paramètres. |
| `Exchange Rate (FX Override)` | Le taux de change historique manuel remplace la table globale lorsqu'il est renseigné. | Les codes de devises non mappés renvoient `0` pour forcer une revue. |
| `Customer Receipt → Invoice ID` | L'enregistrement de paiement doit référencer une facture de vente B2B émise valide. | Signale l'erreur `Invalid Invoice Reference`. |
| `Supplier Payment → Bill ID` | L'enregistrement de décaissement doit référencer une facture fournisseur journalisée valide. | Signale l'erreur `Invalid Vendor Bill Reference`. |
| `Settlement Currency Match` | La devise de l'encaissement/décaissement doit correspondre à celle de la facture/note parente. | Déclenche un avertissement d'audit `Currency Mismatch`. |
| `Payment Transaction Amount` | Tous les encaissements et décaissements sont saisis en valeurs positives. | Les entrées négatives déclenchent une alerte d'audit des transactions. |
| `Settlement Balance Tolerance` | Les petits écarts d'arrondi bancaire dans le seuil configuré sont réglés automatiquement. | Affiche le statut `Settled`, `Partial` ou `Overpaid`. |
| `Invoice & Supplier Due Dates` | Évalués dynamiquement par rapport au `Analysis Date` défini par l'utilisateur. | Surligne le statut d'ancienneté `Overdue` ou `Due Soon`. |
| `Booking Direct Cost Completeness` | Les réservations actives exigent des factures de coûts des fournisseurs terrestres liées. | Diagnostique `Missing Supplier Cost` (risque de marge gonflée). |
| `Booking Revenue Completeness` | Les réservations actives exigent des factures de vente B2B clients liées. | Diagnostique `Missing Customer Invoice` (risque de voyage non facturé). |
| `Booking Gross Margin Threshold` | Évalué par rapport à la marge cible de l'agence et au plancher de bénéfice zéro. | Signale `Below Target Margin` ou `Loss-Making Booking`. |
| `Operating Overhead Separation` | Les frais SG&A de l'agence sont journalisés strictement en dehors du calcul analytique des voyages. | Empêche les frais généraux de fausser la marge brute par réservation. |
| `Expense Cash Status` | Étiqueté explicitement `Paid` ou `Unpaid`. | Seuls les frais généraux `Paid` se déduisent du flux de trésorerie net mensuel. |
| `Dynamic Array Spill Zones` | Les plages de sortie des formules doivent rester exemptes de saisies manuelles. | Alerte d'obstruction Excel standard `#SPILL!`. |
| `Default Ledger Capacity` | Préconfiguré pour des lignes `5–2000` par registre de transactions. | Références de plages extensibles pour les DMC à fort volume. |

### Limites de mise en œuvre & considérations opérationnelles
Lors du déploiement de ce classeur dans un environnement réel de **comptabilité d'agence de voyages**, gardez à l'esprit les limites architecturales suivantes :

- **Contrôles de doublons d'identifiants :** La détection automatique des doublons s'exécute explicitement sur le `Booking ID`. La numérotation séquentielle unique des `Invoice ID`, `Supplier Bill ID`, `Payment ID` et `Expense ID` doit être maintenue par saisie standard des lignes.
- **Gestion des incohérences de devise :** Bien que le système déclenche un avertissement d'audit si la devise d'un paiement diffère de celle de sa facture parente ou de sa note fournisseur, il n'interrompt pas le calcul. Les teneurs de livres doivent résoudre les incohérences de devise avant de s'appuyer sur les soldes nets.
- **Seuil de risque de crédit client :** L'indicateur automatisé d'acheteur à haut risque utilise actuellement un **seuil standardisé de taux de recouvrement de 50 %** plutôt qu'une cellule de paramètre ajustable par l'utilisateur.
- **Agrégation des règlements en devise d'origine :** Les formules de soldes AR et AP additionnent les paiements fractionnés dans leur devise de facture d'origine ; maintenir la cohérence des devises entre les factures et les paiements correspondants est requis pour une ancienneté exacte.
- **Taux de change de référence statiques :** Les taux FX globaux sont des hypothèses de gestion définies manuellement plutôt que des flux API en temps réel, garantissant un reporting financier historique stable et auditable.

---

## Questions fréquentes (FAQ comptabilité d'agence de voyages B2B & calcul des coûts de voyage)

<details>
<summary><strong>Comment les agences de voyages et les DMC calculent-ils la véritable marge bénéficiaire par réservation de voyage ?</strong></summary>
<br>
Pour calculer avec précision la rentabilité d'un voyage par réservation (calcul analytique des coûts), une agence de voyages doit relier chaque facture client B2B et chaque facture directe de fournisseur terrestre (hôtels, autocars de charter, guides touristiques, repas, billets d'entrée) à un <code>Booking ID</code> unique. La soustraction du total des coûts fournisseurs normalisés des revenus facturés normalisés donne le <strong>bénéfice brut de la réservation</strong>. La division du bénéfice brut de la réservation par les revenus facturés produit la <strong>marge brute (%)</strong>, tandis que la division par le nombre total de passagers payants produit le <strong>bénéfice par PAX</strong>.
</details>

<details>
<summary><strong>Pourquoi mon agence de voyages est-elle rentable sur papier mais à court de liquidités en banque ?</strong></summary>
<br>
Les agences de voyages subissent fréquemment des crises de fonds de roulement dues aux décalages temporels entre les <strong>comptes clients (AR)</strong> et les <strong>comptes fournisseurs (AP)</strong>. Quand les partenaires B2B étrangers ne versent qu'un acompte de 20 %–30 % d'avance et règlent le solde après la fin du voyage, tandis que les hôtels et transporteurs locaux exigent un prépaiement de 50 %–100 % avant l'arrivée, des réservations rentables créent un flux de trésorerie temporairement négatif. Le suivi séparé des encaissements réels par rapport aux revenus de factures comptables prévient les crises de liquidité en haute saison.
</details>

<details>
<summary><strong>Puis-je utiliser ce modèle Excel comme alternative gratuite aux logiciels ERP pour agence de voyages ?</strong></summary>
<br>
Oui. Pour les tour operators réceptifs de petite et moyenne taille, les DMC boutique et les agences de voyages grossistes traitant jusqu'à ~2 000 transactions annuelles par registre, ce classeur Microsoft Excel natif fournit le calcul analytique des coûts par réservation, l'ancienneté AR/AP multidevise et des tableaux de bord de compte de résultat de direction sans coûts d'abonnement SaaS récurrents ni mise en œuvre ERP complexe.
</details>

---

## À propos du créateur & du dépôt open source

Je conçois des **suiveurs de business intelligence légers, des tableurs de modélisation financière et des outils d'aide à la décision opérationnelle** pour les industries où des journaux de transactions fragmentés masquent la réalité commerciale. Chaque cadre répond à une question fondamentale : *Quel volume minimal de données viables doit être connecté pour que la direction puisse prendre sa prochaine décision financière en toute confiance ?*

- 📂 **[Explorez d'autres modèles open source de modélisation financière et outils d'aide à la décision au Theseus Workshop sur GitHub](https://github.com/HyVoid)**
- ⚖️ **[Consultez les conditions complètes d'usage commercial et de redistribution de la licence Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)**