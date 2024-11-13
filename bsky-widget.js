/**
 * Copyright (c) 2024 Saurabh Daware
 * Licensed under the MIT License.
 * A copy of their license is avaliable for reading at https://github.com/saurabhdaware/bsky-widget/blob/main/LICENSE
**/

const l = "*{box-sizing:border-box}h2{margin:0;font-size:var(--bsky-text-title);line-height:var(--bsky-text-title-line-height)}p{margin:0}a{color:var(--bsky-interactive);text-decoration:none}a:hover{text-decoration:underline}.widget-container{height:100%;position:relative;font-family:Arial,Helvetica,sans-serif,-apple-system,sans-serif;width:100%;text-align:left}.card-content-container{position:relative;font-size:var(--bsky-text-medium);line-height:1.3rem;padding-bottom:24px;opacity:0;transition:opacity .3s ease;border-radius:8px;overflow:auto;background-color:#fff;box-shadow:1px 1px 8px 1px #0002;height:100%;--bsky-interactive: #1185fe;--bsky-interactive-hover: #4ca2fe;--bsky-text-on-theme: #fff;--bsky-text-title: 1.4rem;--bsky-text-title-line-height: 1.8rem;--bsky-text-medium: 1rem;--bsky-text-small: .9rem}.card-content-container.show{opacity:1}.loading-container{position:absolute;left:0;right:0;top:0;bottom:0;height:100%;width:100%;display:flex;justify-content:center;align-items:center}.avatar-follow-container{display:flex;justify-content:space-between;align-items:flex-end;min-height:50px;flex-grow:0;flex-shrink:0;position:absolute;width:100%;top:-32px}.avatar-follow-container-placeholder{height:48px}.no-banner .avatar-follow-container{position:relative;top:unset;align-items:center;padding-top:12px}.no-banner .avatar-follow-container-placeholder{height:0px}.padded{padding:0 14px}.bsky-button{background-color:var(--bsky-interactive);text-decoration:none!important;color:var(--bsky-text-on-theme);padding:9px 16px;border-radius:18px;font-weight:400;font-size:var(--bsky-text-small);display:flex;align-items:center;gap:6px}.bsky-button:hover{background-color:var(--bsky-interactive-hover)}.banner{width:100%;aspect-ratio:3 / 1;background-size:cover;position:relative;background-color:var(--bsky-interactive)}.profile-header-container{display:flex;gap:6px;flex-direction:column;position:relative}.name-handle-container{display:flex;justify-content:center;flex-direction:column;gap:2px}.followers{display:flex;gap:8px;margin-top:6px}.count{font-weight:700}.avatar{border-radius:100%;border:2px solid #fff}.profile-description-container{padding-top:12px;max-width:calc(100% - 28px)}.logo-anchor{text-decoration:none;position:absolute;bottom:12px;right:14px}.bluesky-flutter{display:inline-flex;gap:.5em;align-items:center}.bluesky-flutter svg{width:2em;height:2em;transition:.2s}.bluesky-flutter .left{transform-origin:center}.bluesky-flutter .right{transform-origin:center;transform:scaleX(-1)}.bluesky-flutter:hover .left,.bluesky-flutter:focus .left{animation:flutter .43s ease-in-out;--flip: 1}.bluesky-flutter:hover .right,.bluesky-flutter:focus .right{animation:flutter .5s ease-in-out;--flip: -1}.bluesky-flutter:hover svg,.bluesky-flutter:focus svg{transform:rotate(-5deg);transition:.5s}@media (prefers-reduced-motion){.bluesky-flutter:hover .left,.bluesky-flutter:focus .left,.bluesky-flutter:hover .right,.bluesky-flutter:focus .right{animation:none}}@keyframes flutter{10%{transform:scale(calc(var(--flip) * 1),.9)}20%{transform:scaleX(calc(var(--flip) * .5))}40%{transform:scale(calc(var(--flip) * .9),.95)}60%{transform:scaleX(calc(var(--flip) * .3))}80%{transform:scale(calc(var(--flip) * .9),.95)}to{transform:scaleX(calc(var(--flip) * 1))}}", a = (e) => e == null ? "" : typeof e == "function" ? a(e()) : Array.isArray(e) ? e.join("") : typeof e == "object" ? JSON.stringify(e) : typeof e == "string" || typeof e == "boolean" || // string, boolean, number can take care of stringifying at the end
typeof e == "number" ? e : String(e), c = (e) => {
  const t = /\b((?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[a-zA-Z0-9._~:/?#\[\]@!$&'()*+,;=%-]*)?)|@[a-zA-Z0-9._]+/gi;
  let r = e.replace(t, (n) => n.startsWith("@") ? n.includes(".") ? `<a href="${`https://bsky.app/profile/${n.slice(1)}`}" target="_blank" rel="noopener noreferrer">${n}</a>` : n : `<a href="${n.startsWith("http") ? n : `https://${n}`}" target="_blank" rel="noopener noreferrer">${n.length > 24 ? `${n.slice(0, 24)}...` : n}</a>`);
  return r = r.replace(/\n/g, "<br />"), r;
}, i = (e) => {
  if (!e)
    return e;
  const t = document.createElement("div");
  return t.textContent = e, t.innerHTML;
}, d = (e = {}) => `
<div class="card-content-container ${a(e.banner ? "has-banner" : "no-banner")}">
  ${a(e.banner ? (
  /* html */
  `<div class="banner" style="background-image: url('${e.banner}');"></div>`
) : null)}
  <div class="profile-header-container">
    <div class="avatar-follow-container-placeholder"></div>
    <div class="avatar-follow-container padded">
      <div style="height: 80px">
        <img class="avatar" alt="${a(e.displayName)}'s Profile Picture"  src="${a(e.avatar)}" width="80px" height="80px" />
      </div>
      <a class="bsky-button follow-button" href="https://bsky.app/profile/${a(e.handle)}" target="_blank">
        <svg fill="none" width="16" viewBox="0 0 24 24" height="16" style="color: rgb(241, 243, 245); pointer-events: none;"><path fill="hsl(211, 20%, 95.3%)" fill-rule="evenodd" clip-rule="evenodd" d="M12 3a1 1 0 0 1 1 1v7h7a1 1 0 1 1 0 2h-7v7a1 1 0 1 1-2 0v-7H4a1 1 0 1 1 0-2h7V4a1 1 0 0 1 1-1Z"></path></svg>
        <span class="text">Follow</span>
      </a>
    </div>
    <div class="name-handle-container padded">
      <h2>${a(e.displayName)}</h2>
      <p class="handle">@${a(e.handle)}</p>
      <div class="followers">
        <p><span class="count">${a(e.followersCount)}</span> Followers</p>
        <p><span class="count">${a(e.followsCount)}</span> Following</p>
      </div>
    </div>
  </div>
  ${a(
  e.description ? (
    /* html */
    `
      <div class="profile-description-container padded">
        <p>${c(e.description)}</p>
      </div>
    `
  ) : null
)}
  
  <a 
    class="logo-anchor bluesky-flutter" 
    href="https://bsky.app/profile/${a(e.handle)}" 
    target="_blank" rel="noreferrer noopener" 
    aria-label="View ${a(e.handle)}'s bluesky profile">
    <svg id="flutterby" class="bluesky-flutter" viewBox="0 0 566 500" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <path id="wing" fill="currentColor" d="M 123.244 35.008 C 188.248 83.809 283.836 176.879 283.836 235.857 C 283.836 316.899 283.879 235.845 283.836 376.038 C 283.889 375.995 282.67 376.544 280.212 383.758 C 266.806 423.111 214.487 576.685 94.841 453.913 C 31.843 389.269 61.013 324.625 175.682 305.108 C 110.08 316.274 36.332 297.827 16.093 225.504 C 10.271 204.699 0.343 76.56 0.343 59.246 C 0.343 -27.451 76.342 -0.206 123.244 35.008 Z" />
      </defs>
      <use xlink:href="#wing" class="left" />
      <use xlink:href="#wing" class="right" />
    </svg>
  </a>
</div>
`, f = ["0px", "none"], h = async (e) => await (await fetch(
  `https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${e}`
)).json();
class p extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.innerHTML = `
      <style>
      ${l}
      </style>
      <div class="widget-container"></div>
    `;
  }
  async connectedCallback() {
    if (this.dataset.handle)
      try {
        this.setCardDefaultBounds();
        const t = await h(this.dataset.handle);
        if (t.error)
          throw new Error(t.message);
        this.render(t);
      } catch (t) {
        this.renderError(t);
      }
  }
  static get observedAttributes() {
    return ["data-handle", "data-show-description", "data-show-banner"];
  }
  attributeChangedCallback(t, r, n) {
    ["data-handle", "data-show-description", "data-show-banner"].includes(
      t
    ) && r !== n && (this.setCardDefaultBounds(), this.connectedCallback());
  }
  setStyleIfNotDefined(t, r) {
    const n = getComputedStyle(this)[t];
    !this.style[t] && f.includes(n) && (this.style[t] = r);
  }
  setCardDefaultBounds() {
    this.setStyleIfNotDefined("width", "350px"), this.setStyleIfNotDefined("maxWidth", "100%"), this.setStyleIfNotDefined("minHeight", "170px"), this.style.display = "inline-block";
  }
  setHeight(t) {
    this.style.minHeight = t;
  }
  render(t) {
    const r = this.shadowRoot.querySelector(
      ".widget-container"
    ), n = this.dataset.showBanner !== "false", o = this.dataset.showDescription !== "false";
    r.innerHTML = d({
      displayName: i(t.displayName),
      handle: i(t.handle),
      description: o ? i(t.description) : void 0,
      avatar: i(t.avatar),
      banner: n ? i(t.banner) : void 0,
      followersCount: i(t.followersCount.toString()),
      followsCount: i(t.followsCount.toString())
    });
    const s = r.querySelector(
      ".card-content-container"
    );
    s.offsetHeight, s.classList.add("show"), this.setAttribute("data-rendered", "true");
  }
  renderError(t) {
    const r = this.shadowRoot.querySelector(
      ".widget-container"
    );
    r.innerHTML = `
      <div class="error">
        ${t.message}
      </div>
    `;
  }
}
customElements.define("bsky-widget", p);