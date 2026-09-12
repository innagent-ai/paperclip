// innagent: status derivados dos tokens da marca
# Hero Capsule Bank

The hero capsule bank is the one approved decorative exception to the rule that capsules represent individual agents. It is a canonical Paperclip brand surface. Do not improvise a different capsule bank.

## Source Precedence

1. `paperclip-content/td/capsules.md` - byte-accurate technical source for geometry, gradients, grain, crop, and wave.
2. Paperclip feature-video HyperFrames skill:
   - `references/capsule-bank-spec.md`
   - `references/brand-tokens.md`
   - `references/composition-recipes.md`
3. `paperclip-content/videos/wireframe-skill-launch/src/HeroCapsuleBank.tsx` - working Remotion implementation.

## Coordinate System

| Property | Value |
| --- | --- |
| ViewBox | `0 0 1200 675` |
| Background | `#131415` |
| Square crop | `viewBox="250 -19 700 700"` |
| Columns | 8 |
| Capsules per column | 12 |
| Total capsules | 96 |

## Capsule Shape

| Property | Value |
| --- | --- |
| Width | 70 |
| Height | 170 |
| Radius | 35 |
| Rect anchor | `x=-35`, `y=-85` |
| Positioning | translate each rect to center `(cx, cy)` |

The capsule body is rigid. Never deform the capsule shape for wave motion.

## Layout

| Column | `tx` | `ty0` |
| --- | --- | --- |
| 0 | 355 | 154.464 |
| 1 | 425 | 161.240 |
| 2 | 495 | 101.067 |
| 3 | 565 | 111.908 |
| 4 | 635 | 137.808 |
| 5 | 705 | 181.764 |
| 6 | 775 | 150.630 |
| 7 | 845 | 123.362 |

Formula:

```txt
STRIDE_Y = 380 / 11
cx = tx[column]
cy = ty0[column] + slot * STRIDE_Y
```

Drawing order is column order 0..7, and within each column slot order 0..11. Higher slot indices draw later and cover lower ones.

## Gradient Palette

Each gradient is a two-stop linear gradient with a rotation angle in degrees.

| id | angle | top | bottom |
| --- | --- | --- | --- |
| g0 | 90.000 | `#005CB4` | `#A9B800` |
| g1 | 90.000 | `#0065C3` | `#94A200` |
| g2 | 90.000 | `#1571D3` | `#869200` |
| g3 | 90.000 | `#2B82E5` | `#DF403F` |
| g4 | 90.000 | `#4095FA` | `#D83839` |
| g5 | 90.000 | `#3F94F9` | `#D23235` |
| g6 | 90.000 | `#378CF0` | `#CC2C30` |
| g7 | 90.000 | `#E54644` | `#0F6ED0` |
| g8 | 90.000 | `#E04140` | `#086BCC` |
| g9 | 90.000 | `#DC3D3D` | `#0060BB` |
| g10 | 90.000 | `#818D00` | `#00519F` |
| g11 | 90.000 | `#8D9900` | `#004487` |
| g12 | 118.000 | `#9B0014` | `#CCD364` |
| g13 | 118.727 | `#A00015` | `#CCBD5C` |
| g14 | 119.455 | `#0056A9` | `#A3B200` |
| g15 | 120.182 | `#005CB4` | `#919F00` |
| g16 | 120.909 | `#004E9A` | `#828E00` |
| g17 | 121.636 | `#004182` | `#758000` |
| g18 | 122.364 | `#003771` | `#6B7500` |
| g19 | 123.091 | `#00356D` | `#BE1924` |
| g20 | 123.818 | `#00468B` | `#BD1823` |
| g21 | 124.545 | `#005CB3` | `#BC1622` |
| g22 | 125.273 | `#1C76D8` | `#BD1723` |
| g23 | 126.000 | `#489489` | `#0065C3` |
| g24 | 127.818 | `#990014` | `#D8D766` |
| g25 | 137.636 | `#004E9A` | `#DCD465` |
| g26 | 147.455 | `#004F9C` | `#E0D064` |
| g27 | 157.273 | `#00478D` | `#C6D728` |
| g28 | 167.091 | `#003973` | `#C1D21E` |
| g29 | 176.909 | `#002E60` | `#BDCE13` |
| g30 | 186.727 | `#002752` | `#B8C900` |
| g31 | 196.545 | `#002550` | `#B4C400` |
| g32 | 206.364 | `#002E60` | `#B0C000` |
| g33 | 216.182 | `#003872` | `#ACBC00` |
| g34 | 226.000 | `#004385` | `#A9B800` |
| g35 | 93.273 | `#9FAD00` | `#004890` |
| g36 | 96.545 | `#B4C400` | `#004D98` |
| g37 | 99.818 | `#C1CC5F` | `#0052A1` |
| g38 | 103.091 | `#9BC358` | `#0058AC` |
| g39 | 106.364 | `#7ABB52` | `#005DB6` |
| g40 | 109.636 | `#61B34D` | `#0063C0` |
| g41 | 112.909 | `#50AD4A` | `#0063C1` |
| g42 | 116.182 | `#4CA654` | `#0064C2` |
| g43 | 119.455 | `#4BA066` | `#0064C2` |
| g44 | 122.727 | `#499A78` | `#0064C3` |

SVG template:

```xml
<linearGradient id="g0" gradientUnits="objectBoundingBox"
  x1="0" y1="0" x2="1" y2="0"
  gradientTransform="rotate(90 0.5 0.5)">
  <stop offset="0%" stop-color="#005CB4" />
  <stop offset="100%" stop-color="#A9B800" />
</linearGradient>
```

## Per-Column Gradient Sequences

Each sequence lists slots 0..11.

| Column | Sequence |
| --- | --- |
| 0 | `g0 g1 g2 g3 g4 g5 g6 g7 g8 g9 g10 g11` |
| 1 | `g12 g13 g14 g15 g16 g17 g18 g19 g20 g21 g22 g23` |
| 2 | `g11 g10 g9 g8 g7 g6 g5 g4 g3 g2 g1 g0` |
| 3 | `g23 g22 g21 g20 g19 g18 g17 g16 g15 g14 g13 g12` |
| 4 | `g12 g24 g25 g26 g27 g28 g29 g30 g31 g32 g33 g34` |
| 5 | `g0 g1 g2 g3 g4 g5 g6 g7 g8 g9 g10 g11` |
| 6 | `g11 g35 g36 g37 g38 g39 g40 g41 g42 g43 g44 g23` |
| 7 | `g0 g1 g2 g3 g4 g5 g6 g7 g8 g9 g10 g11` |

## Grain Overlay

Grain is part of the motif. Do not omit it for canonical hero-bank renders unless the output medium cannot support it.

| Property | Value |
| --- | --- |
| SVG primitive | `feTurbulence type="fractalNoise"` |
| Base frequency | `2.95` |
| Octaves | 5 |
| Seed | 9 |
| Opacity | 0.86 |
| Blend mode | `overlay` |
| Mask | union of capsule shapes only |

Overlay formula per channel:

```txt
overlay(b, o) = 2 * b * o                     if b < 0.5
overlay(b, o) = 1 - 2 * (1 - b) * (1 - o)     otherwise
final = mix(b, overlay(b, o), 0.86)
```

Background pixels stay clean `#131415`; grain is masked inside capsules.

## Optional Wave Motion

For motion, translate each capsule rigidly on y. Do not scale, bend, or morph the capsule.

| Property | Value |
| --- | --- |
| Wave amplitude | 9 |
| Per-capsule phase step | `PI / 3` |
| Per-column phase factor | `2 * PI / 280` |
| Loop period | 4 seconds |

Formula:

```txt
dy(column, slot, t) =
  9 * sin((2 * PI * t / 4) - (2 * PI / 280) * tx[column] - slot * (PI / 3))
```

For a static still that matches the captured spec, set amplitude to 0 and use the `ty0` values verbatim.

## Rendering Checklist

1. Paint background `#131415`.
2. Draw 8 columns x 12 capsules using the layout and gradient sequence tables.
3. Apply the grain overlay, masked to capsule shapes.
4. For square exports, crop to `250 -19 700 700`.
5. If animated, loop the wave over exactly 4 seconds and provide reduced-motion/static output.
6. Do not add strokes, shadows, glow, extra gradients, or additional capsule rows.
