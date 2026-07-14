import os
import glob
import re

css_addition = """
/* ---------- SCROLL INDICATOR ---------- */
.hero__scroll-indicator {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    color: rgba(255, 255, 255, 0.6);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-decoration: none;
    z-index: 10;
    opacity: 0;
    animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: 1.2s;
    transition: color 0.3s ease;
}

.hero__scroll-indicator:hover {
    color: var(--gold);
}

.hero__scroll-indicator-mouse {
    width: 22px;
    height: 34px;
    border: 2px solid currentColor;
    border-radius: 12px;
    position: relative;
}

.hero__scroll-indicator-wheel {
    width: 4px;
    height: 6px;
    background: currentColor;
    border-radius: 2px;
    position: absolute;
    top: 6px;
    left: 50%;
    transform: translateX(-50%);
    animation: scrollWheel 2s infinite cubic-bezier(0.15, 0.41, 0.69, 0.94);
}

@keyframes scrollWheel {
    0% { transform: translate(-50%, 0); opacity: 1; }
    100% { transform: translate(-50%, 12px); opacity: 0; }
}

@media(max-width: 768px) {
    .hero__scroll-indicator {
        bottom: 20px;
        transform: translateX(-50%) scale(0.9);
    }
}
"""

html_snippet = """
      <!-- SCROLL INDICATOR -->
      <a href="#" class="hero__scroll-indicator" onclick="window.scrollBy({top: window.innerHeight * 0.8, behavior: 'smooth'}); return false;">
        <span>Scroll to explore</span>
        <div class="hero__scroll-indicator-mouse">
          <div class="hero__scroll-indicator-wheel"></div>
        </div>
      </a>
"""

prolanzs_dir = r"c:\Users\USER\Desktop\Prolanzs"

# Update style.css
style_path = os.path.join(prolanzs_dir, "style.css")
with open(style_path, "r", encoding="utf-8") as f:
    style_content = f.read()

if "hero__scroll-indicator" not in style_content:
    with open(style_path, "a", encoding="utf-8") as f:
        f.write("\n" + css_addition)
    print("Added CSS to style.css")
else:
    print("CSS already exists in style.css")

# Update HTML files
html_files = glob.glob(os.path.join(prolanzs_dir, "*.html"))
for html_file in html_files:
    with open(html_file, "r", encoding="utf-8") as f:
        content = f.read()
    
    if "hero__scroll-indicator" in content:
        print(f"Skipping {os.path.basename(html_file)}, already has scroll indicator.")
        continue

    # Find the first occurrence of </section>
    match = re.search(r'</section>', content)
    if match:
        insert_pos = match.start()
        new_content = content[:insert_pos] + html_snippet + content[insert_pos:]
        with open(html_file, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Added scroll indicator to {os.path.basename(html_file)}")
    else:
        print(f"Could not find </section> in {os.path.basename(html_file)}")

print("Done.")
