import{a as p,S as L,i}from"./assets/vendor-c493984e.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&l(d)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();p.defaults.baseURL="https://pixabay.com/api/";const g=(r,e)=>{const o={params:{key:"45487813-fe5f6ff630a438f35d0eece69",q:r,image_type:"photo",orientation:"horizontal",safesearch:"true",page:e,per_page:15}};return p.get("",o)},y=r=>` 
<li class="gallery-item">
  <div>
    <a
      class="gallery-link"
      href="${r.largeImageURL}"
      onclick="return false"
    >
      <img
        class="gallery-image"
        src="${r.webformatURL}"
        alt="${r.tags}"
      />
    </a>
    <ul class="card">
      <li class="card-item">
        <h3 class="card-item-title">Likes</h3>
        <p class="card-item-inf">${r.likes}</p>
      </li>
      <li class="card-item">
        <h3 class="card-item-title">Views</h3>
        <p class="card-item-inf">${r.views}</p>
      </li>
      <li class="card-item">
        <h3 class="card-item-title">Comments</h3>
        <p class="card-item-inf">${r.comments}</p>
      </li>
      <li class="card-item">
        <h3 class="card-item-title">Downloads</h3>
        <p class="card-item-inf">${r.downloads}</p>
      </li>
    </ul>
  </div>
</li>
    `,a=document.querySelector(".js-search-form"),u=document.querySelector(".js-gallery"),f=document.querySelector(".js-load-more"),h=document.querySelector(".loader"),m=new L(".gallery a");let n=1,c="";function b(){const e=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}const v=async r=>{try{r.preventDefault(),h.classList.add("js-loader"),c=a.elements.user_query.value.trim(),n=1;const e=await g(c,n);if(h.classList.remove("js-loader"),c===""){i.info({position:"topRight",message:"Please enter a word to search for...!"}),u.innerHTML="",a.reset();return}if(e.data.total===0){i.error({position:"topRight",message:"Sorry, there are no images matching <br> your search query. Please try again!"}),u.innerHTML="",a.reset();return}const o=e.data.hits.map(t=>y(t)).join(""),l=document.querySelector(".gallery");if(l.innerHTML=o,e.data.totalHits<=15){i.info({position:"topRight",message:"These are all images for this request"}),m.refresh(),a.reset();return}f.classList.add("load-more"),m.refresh(),a.reset()}catch(e){console.log(e)}},S=async r=>{try{n++;const e=await g(c,n);console.dir(e);const o=e.data.hits.map(l=>y(l)).join("");u.insertAdjacentHTML("beforeend",o),e.data.hits.length<15&&(f.classList.remove("load-more"),i.info({position:"topRight",message:"We are sorry, but you have reached the end of search results."})),m.refresh(),a.reset(),b()}catch(e){console.log(e)}};a.addEventListener("submit",v);f.addEventListener("click",S);
//# sourceMappingURL=commonHelpers.js.map
