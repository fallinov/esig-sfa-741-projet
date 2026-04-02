# Polices du projet - Module 113

## 📚 Polices utilisées

### Inter (Police principale)
- **Fichier :** `inter-var.woff2`
- **Taille :** 16 KB
- **Usage :** Texte principal, paragraphes, contenu
- **Caractéristiques :** Police moderne, très lisible, optimisée pour l'écran
- **Source :** Google Fonts / Fontsource

### Poppins (Police des titres)
- **Fichier :** `poppins-var.woff2`
- **Taille :** 7.7 KB
- **Usage :** Titres, sous-titres, éléments d'interface
- **Caractéristiques :** Police ronde et amicale, parfaite pour les titres
- **Source :** Google Fonts / Fontsource

## 🔧 Intégration

Les polices sont intégrées via CSS avec `@font-face` :

```css
@font-face {
  font-family: 'Inter';
  src: url('../fonts/inter-var.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: 'Poppins';
  src: url('../fonts/poppins-var.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
```

## 📱 Responsive et performance

- **Format WOFF2 :** Compression optimale, chargement rapide
- **font-display: swap :** Affichage immédiat avec fallback
- **Polices locales :** Pas de dépendance externe, respect des consignes du projet

## ✅ Validation

- ✅ Polices téléchargées et hébergées localement
- ✅ Format WOFF2 supporté par tous les navigateurs modernes
- ✅ Taille optimisée (< 30 KB total)
- ✅ Intégration CSS correcte
- ✅ Fallback vers les polices système

## 🚀 Utilisation

Les polices sont automatiquement appliquées via les variables CSS :

```css
:root {
  --font-family-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-family-heading: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

---

*Dernière mise à jour : 3 septembre 2024*
