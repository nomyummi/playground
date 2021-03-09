(this["webpackJsonpmemory-card"]=this["webpackJsonpmemory-card"]||[]).push([[0],{16:function(e,a,t){},17:function(e,a,t){},21:function(e,a,t){},22:function(e,a,t){"use strict";t.r(a);var c=t(0),n=t(1),r=t.n(n),s=t(9),o=t.n(s),i=(t(16),t(2)),l=(t(17),t(3)),d=t.n(l),h=t(7),u=t(5);var g=function(e){var a=e.score,t=e.highScore,n=e.maxScore;return Object(c.jsxs)("div",{className:"Scoreboard",children:[Object(c.jsxs)("h3",{children:["Score: ",a]}),Object(c.jsxs)("h3",{id:"highScore",children:["High Score: ",t]}),Object(c.jsxs)("h3",{children:["Max Score: ",n]})]})};var m=function(e){var a=e.handleGame,t=e.shuffle,n=e.cardId,r=e.imageSrc;return Object(c.jsx)("div",{className:"Card",onClick:function(){a(n),t(n)},children:Object(c.jsx)("img",{src:r,alt:n})})};var j=function(e){var a=e.cards,t=e.handleGame,n=e.shuffle;return Object(c.jsx)("div",{className:"CardsGrid",children:a.map((function(e){return Object(c.jsx)(m,{imageSrc:e.imageUrl,cardId:e.cardId,shuffle:n,handleGame:t},e.cardId)}))})},f=t(10),p=t.n(f);t(20),t(21);var b=function(e){var a=e.searchValue,t=e.handleSearch,n=e.onSearchValueChange,r=e.changeDifficulty,s=e.changeMode,o=e.mode;return Object(c.jsxs)("div",{className:"SearchContainer",children:[Object(c.jsxs)("div",{id:"searchBarAndButton",children:[Object(c.jsx)("input",{id:"searchBar",type:"text",value:a,onChange:n,placeholder:"Enter a Pokemon..."}),Object(c.jsx)("button",{id:"searchButton",onClick:function(){t(a)},children:Object(c.jsx)("i",{className:"fas fa-search fa-lg","aria-hidden":"true"})})]}),Object(c.jsx)(p.a,{onChange:function(e){o!==e.value&&(s(e.value),"Gallery Mode"!==o&&r())},options:["Normal Mode","Hard Mode","Gallery Mode"],value:o,arrowClassName:"arrowModeSelect",controlClassName:"controlModeSelect",className:"modeSelect"})]})},O=t.p+"static/media/Pokemon.120b8b05.png",v=[{cardId:"pl2-114",imageUrl:"https://images.pokemontcg.io/pl2/114.png"},{cardId:"swshp-SWSH074",imageUrl:"https://images.pokemontcg.io/swshp/SWSH074.png"},{cardId:"basep-24",imageUrl:"https://images.pokemontcg.io/basep/24.png"},{cardId:"basep-25",imageUrl:"https://images.pokemontcg.io/basep/25.png"},{cardId:"bw11-RC7",imageUrl:"https://images.pokemontcg.io/bw11/RC7.png"},{cardId:"base4-87",imageUrl:"https://images.pokemontcg.io/base4/87.png"},{cardId:"basep-27",imageUrl:"https://images.pokemontcg.io/basep/27.png"},{cardId:"basep-4",imageUrl:"https://images.pokemontcg.io/basep/4.png"},{cardId:"smp-SM86",imageUrl:"https://images.pokemontcg.io/smp/SM86.png"},{cardId:"xy1-42",imageUrl:"https://images.pokemontcg.io/xy1/42.png"}];var x=function(e){var a=e.startingDifficulty,t=e.searchValue,r=e.setSearchValue,s=Object(n.useState)(0),o=Object(i.a)(s,2),l=o[0],m=o[1],f=Object(n.useState)(0),p=Object(i.a)(f,2),x=p[0],S=p[1],M=Object(n.useState)([]),k=Object(i.a)(M,2),I=k[0],y=k[1],U=Object(n.useState)([]),N=Object(i.a)(U,2),C=N[0],V=N[1],G=Object(n.useState)([]),w=Object(i.a)(G,2),E=w[0],H=w[1],B=Object(n.useState)(a),D=Object(i.a)(B,2),P=D[0],A=D[1];function J(e,a){for(var t=Object(u.a)(e),c=t.length-1;c>0;c--){var n=Math.floor(Math.random()*(c+1)),r=[t[n],t[c]];t[c]=r[0],t[n]=r[1]}return t.slice(0,a)}Object(n.useEffect)((function(){"hard"===a?0===t.length?R("articuno"):R(t):0===t.length?(V([].concat(v)),H([].concat(v))):R(t)}),[]);var R=function(){var e=Object(h.a)(d.a.mark((function e(a){var t,c,n,r,s;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.pokemontcg.io/v1/cards?name=".concat(a));case 2:return e.next=4,e.sent.json().then((function(e){return e.cards}));case 4:0!==(t=e.sent).length&&(c=[],t.forEach((function(e){c.push({cardId:e.id,imageUrl:e.imageUrl})})),H(c),n=t.length>=10?10:t.length,r=J(t,n),s=[],r.forEach((function(e){s.push({cardId:e.id,imageUrl:e.imageUrl})})),V(s),y([]),m(0),S(0));case 6:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),W="normal"===P?C.length:E.length;return Object(c.jsxs)("div",{className:"Game",children:[Object(c.jsxs)("div",{className:"Header",children:[Object(c.jsx)("img",{id:"logo",src:O,alt:"logo"}),Object(c.jsx)(g,{score:l,highScore:x,maxScore:W}),Object(c.jsx)(b,{mode:e.mode,changeMode:e.changeMode,handleSearch:R,changeDifficulty:function(){if("normal"===P)A("hard"),0===t.length?R("articuno"):R(t);else if(A("normal"),0===t.length){var e=J([].concat(v),v.length);V(e),H(e),y([]),m(0),S(0)}else R(t)},searchValue:t,onSearchValueChange:function(e){r(e.target.value)}})]}),Object(c.jsx)(j,{cards:C,handleGame:function(e){I.includes(e)&&I.length?(m(0),y([])):(y([].concat(Object(u.a)(I),[e])),m(l+1),l>=x&&S(l+1))},shuffle:"normal"===P?function(){var e=J(C,C.length);V(e)}:function(e){function a(e){if(t.length===E.length)return!0;for(var a=0;a<e.length;a++)if(!t.includes(e[a].cardId))return!0;return!1}var t=Object(u.a)(I);t.includes(e)||(t=[].concat(Object(u.a)(I),[e]));for(var c=J(E,C.length);!a(c);)c=J(E,C.length);V(c)}})]})};var S=function(e){var a=e.searchValue,t=e.setSearchValue,r=Object(n.useState)([]),s=Object(i.a)(r,2),o=s[0],l=s[1];Object(n.useEffect)((function(){0===a.length?u("umbreon"):u(a)}),[]);var u=function(){var e=Object(h.a)(d.a.mark((function e(a){var t,c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return 500,e.next=3,fetch("https://api.pokemontcg.io/v1/cards?name=".concat(a,"&pageSize=").concat(500));case 3:return e.next=5,e.sent.json().then((function(e){return e.cards}));case 5:0!==(t=e.sent).length&&(c=[],t.forEach((function(e){c.push({cardId:e.id,imageUrl:e.imageUrl})})),l(c));case 7:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}();return Object(c.jsxs)("div",{className:"Game",children:[Object(c.jsxs)("div",{className:"Header",children:[Object(c.jsx)("img",{id:"logo",src:O,alt:"logo"}),Object(c.jsx)("div",{id:"emptyPlaceholder"})," ",Object(c.jsx)(b,{mode:e.mode,changeMode:e.changeMode,handleSearch:u,searchValue:a,onSearchValueChange:function(e){t(e.target.value)}})]}),Object(c.jsx)(j,{cards:o,handleGame:function(){},shuffle:function(){}})]})};var M=function(){var e=Object(n.useState)("Normal Mode"),a=Object(i.a)(e,2),t=a[0],r=a[1],s=Object(n.useState)("normal"),o=Object(i.a)(s,2),l=o[0],d=o[1],h=Object(n.useState)(""),u=Object(i.a)(h,2),g=u[0],m=u[1],j=function(e){r(e),"Gallery Mode"===t&&"Hard Mode"===e?d("hard"):"Gallery Mode"===t&&"Normal Mode"===e&&d("normal")},f="Gallery Mode"===t?Object(c.jsx)(S,{searchValue:g,setSearchValue:m,mode:t,changeMode:j}):Object(c.jsx)(x,{searchValue:g,setSearchValue:m,mode:t,changeMode:j,startingDifficulty:l});return Object(c.jsx)("div",{className:"App",children:f})};o.a.render(Object(c.jsx)(r.a.StrictMode,{children:Object(c.jsx)(M,{})}),document.getElementById("root"))}},[[22,1,2]]]);
//# sourceMappingURL=main.0a81b88c.chunk.js.map