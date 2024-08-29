import{a as m,S as L,i as f}from"./assets/vendor-c493984e.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();m.defaults.baseURL="https://pixabay.com/api/";const p=(r,t)=>{const o={params:{key:"45487813-fe5f6ff630a438f35d0eece69",q:r,image_type:"photo",orientation:"horizontal",safesearch:"true",page:t,per_page:15}};return m.get("",o)},h=r=>` 
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
    `,l=document.querySelector(".js-search-form"),y=document.querySelector(".js-gallery"),d=document.querySelector(".js-load-more"),u=document.querySelector(".loader"),g=new L(".gallery a");let c=1,n="";const b=async r=>{try{r.preventDefault(),u.classList.add("js-loader"),n=l.elements.user_query.value,c=1;const t=await p(n,c);if(u.classList.remove("js-loader"),t.data.total===0){f.error({position:"topRight",message:"Sorry, there are no images matching <br> your search query. Please try again!"}),y.innerHTML="",l.reset();return}const o=t.data.hits.map(e=>h(e)).join(""),a=document.querySelector(".gallery");a.innerHTML=o,d.classList.add("load-more"),g.refresh(),l.reset()}catch(t){console.log(t)}},v=async r=>{try{c++;const t=await p(n,c),o=t.data.hits.map(a=>h(a)).join("");y.insertAdjacentHTML("beforeend",o),t.data.hits.length===0&&(d.classList.remove("load-more"),f.info({position:"topRight",message:"We are sorry, but you have reached the end of search results."})),g.refresh(),l.reset()}catch(t){console.log(t)}};l.addEventListener("submit",b);d.addEventListener("click",v);
//# sourceMappingURL=commonHelpers.js.map
