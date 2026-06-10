---
name: Compassion & Hope
colors:
  surface: '#faf8ff'
  surface-dim: '#d8d9e5'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#ecedf9'
  surface-container-high: '#e6e7f4'
  surface-container-highest: '#e1e2ee'
  on-surface: '#191b24'
  on-surface-variant: '#424655'
  inverse-surface: '#2d3039'
  inverse-on-surface: '#eff0fc'
  outline: '#727787'
  outline-variant: '#c2c6d8'
  surface-tint: '#0056d1'
  primary: '#0055ce'
  on-primary: '#ffffff'
  primary-container: '#0a6cff'
  on-primary-container: '#fffeff'
  inverse-primary: '#b2c5ff'
  secondary: '#a72a77'
  on-secondary: '#ffffff'
  secondary-container: '#fd71c0'
  on-secondary-container: '#72004e'
  tertiary: '#a63900'
  on-tertiary: '#ffffff'
  tertiary-container: '#cf4901'
  on-tertiary-container: '#fffeff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2ff'
  primary-fixed-dim: '#b2c5ff'
  on-primary-fixed: '#001847'
  on-primary-fixed-variant: '#0040a0'
  secondary-fixed: '#ffd8e8'
  secondary-fixed-dim: '#ffafd5'
  on-secondary-fixed: '#3d0027'
  on-secondary-fixed-variant: '#88075e'
  tertiary-fixed: '#ffdbce'
  tertiary-fixed-dim: '#ffb59a'
  on-tertiary-fixed: '#380d00'
  on-tertiary-fixed-variant: '#802a00'
  background: '#faf8ff'
  on-background: '#191b24'
  surface-variant: '#e1e2ee'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Geist
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 80px
---

## Brand & Style

The design system for this NGO is built on the pillars of **Impact, Spiritual Grace, and Trust**. It aims to balance the solemnity of its mission with a hopeful, modern outlook. The visual narrative is "Empowered Dignity," moving away from traditional charity tropes toward a premium, professional presence that inspires confidence in donors and hope in beneficiaries.

The style is **Modern/Corporate with a Compassionate Edge**. It utilizes generous whitespace to symbolize clarity and peace, while subtle dove-like curves and cross motifs are integrated into iconography and background patterns to reinforce the faith-inspired mission. The interface feels light, airy, and stable, reflecting the steadfast support the ministry provides.

## Colors

The palette is anchored by **Primary Blue**, representing stability and trust, and **Accent Magenta**, which provides a spiritual, vibrant energy and warmth. 

- **Primary Blue (#0A6CFF):** Used for primary actions, navigation markers, and branding elements.
- **Accent Magenta (#9C1F6E):** Reserved for highlights, heart-driven call-to-actions (like "Donate"), and decorative spiritual motifs.
- **Surface Navy (#0F172A):** Provides high-contrast grounding. Use this for footers, dark-mode cards, and sophisticated typography.
- **Neutrals:** Light Gray (#F8FAFC) is the primary surface color for subtle grouping, while Medium Gray (#64748B) is used for secondary information and metadata.

## Typography

This design system uses a pairing of **Geist** for headlines and **Inter** for body text. This combination offers a technical precision that communicates professionalism, while the humanist qualities of Inter maintain accessibility.

Headlines should use tight letter-spacing to appear "impactful," while body text remains generous in line-height (1.5x minimum) to ensure readability for a diverse audience, including older stakeholders. Label styles use a medium weight to stand out against UI elements like chips or small captions.

## Layout & Spacing

The layout follows a **Fluid Grid** model. On desktop, we utilize a 12-column grid with a 24px gutter and 80px side margins to create a "contained yet breathable" feel. On mobile, this collapses to a 4-column grid with 16px margins.

Spacing is based on an 8px scale. Large sections (Impact Stories, Donation Tiers) should be separated by `lg` (40px) or `xl` (64px) units to maintain the premium, high-whitespace aesthetic. Components within cards should use the `sm` (16px) or `md` (24px) units for internal padding.

## Elevation & Depth

To achieve a "soft and compassionate" feel, this design system avoids harsh borders. Depth is created through **Ambient Shadows** and **Tonal Layers**.

- **Level 1 (Default Cards):** A very soft shadow with a 12px blur, 4px Y-offset, and 4% opacity (Primary Blue tinted).
- **Level 2 (Hover/Active):** An increased blur of 20px and 8% opacity to give the effect of the element "lifting" toward the user.
- **Tonal Grouping:** Use the Neutral Light (#F8FAFC) background to separate content blocks without needing physical lines.
- **Glassmorphism:** Navigation bars and modal backdrops should use a 12px backdrop blur with a 70% white tint to maintain a sense of lightness.

## Shapes

The shape language is defined by **Rounded (0.5rem)** corners. This removes the "sharpness" of institutional software, making the ministry feel more approachable and gentle. 

Large containers and hero image masks can use `rounded-xl` (1.5rem) to emphasize the organic, dove-inspired flow. Buttons and input fields should strictly adhere to the base `rounded` (0.5rem) setting for a consistent, professional appearance.

## Components

### Buttons
- **Primary:** Solid Primary Blue (#0A6CFF) with white text. 0.5rem rounded corners.
- **Support (Donation):** Solid Accent Magenta (#9C1F6E) with white text. Often accompanied by a small heart icon.
- **Ghost:** Primary Blue outline (1px) with transparent background for secondary actions.

### Cards
- **Impact Cards:** White background, Level 1 elevation, 0.5rem rounded corners. Images inside cards should have a top-only 0.5rem radius.
- **Stat Cards:** Navy background with white text and Primary Blue accents for data-heavy impact reporting.

### Input Fields
- Subtle 1px border in Medium Gray (#64748B) at 30% opacity. 
- Focus state: Primary Blue border with a soft glow (3px spread).

### Chips & Tags
- Used for categories (e.g., "Widow Support," "Education").
- Pill-shaped (fully rounded) with a light tint of the Primary or Secondary color and dark text.

### Spiritual Accents
- **Dividers:** Use a subtle "fade-out" line with a centered, 16px dove or cross icon in Accent Magenta.
- **Iconography:** Use "Duotone" style icons with Primary Blue as the base and Accent Magenta as the highlight color.