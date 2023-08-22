(function(){"use strict";var e={4536:function(e,a,t){var l=t(9242),n=t(3396),r=t(4870),c=(t(7658),t(6229),t(7330),t(2062),t(7139));const i={class:"dnd-card__header"},u={class:"dnd-card__name dnd-card__cell"},o={class:"dnd-card__two-row"},d={class:"dnd-card__casting-time dnd-card__cell dnd-card__property"},s=(0,n._)("div",{class:"dnd-card__property-label"}," Casting Time ",-1),v={class:"dnd-card__range dnd-card__cell dnd-card__property"},p=(0,n._)("div",{class:"dnd-card__property-label"}," Range ",-1),_={class:"dnd-card__two-row"},m={class:"dnd-card__components dnd-card__cell dnd-card__property"},g=(0,n._)("div",{class:"dnd-card__property-label"}," Components ",-1),h={class:"dnd-card__duration dnd-card__cell dnd-card__property"},f=(0,n._)("div",{class:"dnd-card__property-label"}," Duration ",-1),y={key:0,class:"dnd-card__material"},w={class:"dnd-card__description"},b={key:1,class:"dnd-card__higher-levels"},k=(0,n._)("div",{class:"dnd-card__higher-levels-label"}," At higher levels: ",-1),U={class:"dnd-card__footer"},x=(0,n._)("span",{class:"dnd-card__edit-button-inner"},null,-1),S=[x];var C={__name:"DndCard",props:{name:{type:String,default:()=>""},meta:{type:Object,default:()=>({type:{level:0,school:"other"},castingTime:"1 action",range:"self",components:{verbal:!0,somatic:!1,material:!1,materialName:""},duration:"instantaneous",concentration:!1})},description:{type:String,default:()=>""},higherLevels:{type:String,default:()=>""},textSize:{type:Number,default:()=>10},index:{type:Number,required:!0},isCurrent:{type:Boolean,default:!1}},emits:["editButtonClick","deleteButtonClick"],setup(e,{emit:a}){const t=e,l=(0,n.Fl)((()=>{let e=[];return t.meta.components.verbal&&e.push("V"),t.meta.components.somatic&&e.push("S"),t.meta.components.material&&e.push("M"),e.length>0?e.join(", "):"-"})),r=(0,n.Fl)((()=>(""===t.meta.duration?"Instantaneous":t.meta.duration)+(t.meta.concentration?" (C)":""))),x=(0,n.Fl)((()=>{const e=Math.max(0,t.meta.type.level);let a=e+"th-level "+t.meta.type.school;if(e<4)switch(e){case 0:a=t.meta.type.school+" cantrip";break;case 1:a="1st-level "+t.meta.type.school;break;case 2:a="2nd-level "+t.meta.type.school;break;case 3:a="3rd-level "+t.meta.type.school;break}return a})),C=()=>{a("editButtonClick",t.index)},D=()=>{a("deleteButtonClick",t.index)};return(e,a)=>((0,n.wg)(),(0,n.iD)("div",{class:(0,c.C_)(["dnd-card",t.isCurrent&&"is-current"])},[(0,n._)("div",i,[(0,n._)("div",u,(0,c.zw)(t.name),1),(0,n._)("div",o,[(0,n._)("div",d,[s,(0,n.Uk)(" "+(0,c.zw)(t.meta.castingTime),1)]),(0,n._)("div",v,[p,(0,n.Uk)(" "+(0,c.zw)(t.meta.range),1)])]),(0,n._)("div",_,[(0,n._)("div",m,[g,(0,n.Uk)(" "+(0,c.zw)(l.value),1)]),(0,n._)("div",h,[f,(0,n.Uk)(" "+(0,c.zw)(r.value),1)])])]),(0,n._)("div",{class:"dnd-card__body dnd-card__cell",style:(0,c.j5)({fontSize:t.textSize+"px"})},[t.meta.components.materialName?((0,n.wg)(),(0,n.iD)("div",y," Material: "+(0,c.zw)(t.meta.components.materialName),1)):(0,n.kq)("",!0),(0,n._)("div",w,(0,c.zw)(t.description),1),t.higherLevels?((0,n.wg)(),(0,n.iD)("div",b,[k,(0,n.Uk)(" "+(0,c.zw)(t.higherLevels),1)])):(0,n.kq)("",!0)],4),(0,n._)("div",U,(0,c.zw)(x.value),1),(0,n._)("div",{class:"dnd-card__button-overlay"},[(0,n._)("button",{class:"dnd-card__edit-button","aria-label":"edit",onClick:C},S),(0,n._)("button",{class:"dnd-card__delete-button","aria-label":"delete",onClick:D})])],2))}};const D=C;var z=D;const j={class:"input-text"},O=["for"],H=["id","type"],N=["id"];var T={__name:"InputText",props:{value:{type:[String,Number],default:()=>null},id:{type:String,default:()=>""},textarea:{type:Boolean,default:!1},label:{type:String,default:()=>""},type:{type:String,default:()=>"text"}},emits:["update:value","input"],setup(e,{emit:a}){const t=e,r=(0,n.Fl)({get(){return t.value},set(e){a("update:value",e)}});return(e,i)=>((0,n.wg)(),(0,n.iD)("div",j,[t.label?((0,n.wg)(),(0,n.iD)("label",{key:0,class:"input-text__label",for:t.id},(0,c.zw)(t.label),9,O)):(0,n.kq)("",!0),t.textarea?(0,n.wy)(((0,n.wg)(),(0,n.iD)("textarea",{key:2,id:t.id,"onUpdate:modelValue":i[2]||(i[2]=e=>r.value=e),class:"input-text__input"},null,8,N)),[[l.nr,r.value]]):(0,n.wy)(((0,n.wg)(),(0,n.iD)("input",{key:1,id:t.id,"onUpdate:modelValue":i[0]||(i[0]=e=>r.value=e),type:t.type,class:"input-text__input",onInput:i[1]||(i[1]=e=>a("input",e))},null,40,H)),[[l.YZ,r.value]])]))}};const W=T;var q=W;const B={class:"input-check"},I={class:"input-check__box"};var F={__name:"InputCheck",props:{value:{type:Boolean,default:()=>null},character:{type:String,default:()=>"V"}},emits:["update:value"],setup(e,{emit:a}){const t=e,r=(0,n.Fl)({get(){return t.value},set(e){a("update:value",e)}});return(e,a)=>((0,n.wg)(),(0,n.iD)("div",B,[(0,n.wy)((0,n._)("input",{"onUpdate:modelValue":a[0]||(a[0]=e=>r.value=e),type:"checkbox",class:"input-check__input"},null,512),[[l.e8,r.value]]),(0,n._)("div",I,(0,c.zw)(t.character),1)]))}};const L=F;var M=L;const V={class:"query-results"},Y=["onClick"];var K={__name:"QueryResults",props:{results:{type:Array,default:()=>null}},emits:["suggestion-click"],setup(e,{emit:a}){const t=e;return(e,l)=>((0,n.wg)(),(0,n.iD)("ul",V,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(t.results,((e,t)=>((0,n.wg)(),(0,n.iD)("li",{key:t,class:"query-results__item",onClick:t=>a("suggestion-click",e.url)},(0,c.zw)(e.name),9,Y)))),128))]))}};const A=K;var P=A;const R={key:0,class:"card-configurator"},E=(0,n._)("div",{class:"card-configurator__title"}," Configure card ",-1),G={class:"card-configurator__inputs"},J={class:"card-configurator__two-row"},Q={class:"card-configurator__two-row"},Z={class:"card-configurator__two-row"},X={class:"card-configurator__checkbox-wrapper"},$=(0,n._)("div",{class:"card-configurator__checkbox-label"}," Components ",-1),ee={class:"card-configurator__checkbox-inner"},ae={class:"card-configurator__duration-wrapper"};var te={__name:"CardConfigurator",props:{currentIndex:{type:Number,default:()=>-1},cards:{type:Array,default:()=>[]}},emits:["update:cards","update"],setup(e,{emit:a}){const t=e,c=(0,n.Fl)({get(){return t.cards},set(e){a("update:cards",e)}}),i=(0,n.Fl)({get(){return c.value[t.currentIndex]},set(e){c.value[t.currentIndex]=e}});(0,n.YP)((()=>i),(()=>{a("update")}),{deep:!0});const u=(0,r.iH)(null),o=(0,r.iH)([]),d=(0,r.iH)(!1),s=(0,r.iH)(!1),v=async()=>{if(i.value.name.length>3){u.value&&clearTimeout(u.value);const e=i.value.name.replace(" ","+");u.value=setTimeout((async()=>{d.value=!0,u.value=null;try{const a=await fetch("https://www.dnd5eapi.co/api/spells/?name="+e),t=await a.json();d.value=!1,t.count>0&&(s.value=!0,o.value=t.results)}catch(a){d.value=!1}}),1e3)}},p=()=>{s.value=!1},_=async e=>{s.value=!1;try{const a=await fetch("https://www.dnd5eapi.co"+e),t=await a.json();m(t)}catch(a){}},m=e=>{i.value={name:e.name,meta:{type:{level:e.level,school:e.school?e.school.name:"Other"},castingTime:e.casting_time,range:e.range,components:{verbal:e.components.includes("V"),somatic:e.components.includes("S"),material:e.components.includes("M"),materialName:e.material??""},duration:e.duration,concentration:e.concentration},description:e.desc.join("\n\n"),higherLevels:e.higher_level.length>0?e.higher_level.join("\n\n"):"",textSize:12}};return(e,a)=>-1!==t.currentIndex?((0,n.wg)(),(0,n.iD)("div",R,[E,(0,n._)("div",G,[(0,n.Wm)((0,r.SU)(q),{value:i.value.name,"onUpdate:value":a[0]||(a[0]=e=>i.value.name=e),class:"card-configurator__name",label:"Name",onInput:v,onKeyup:(0,l.D2)(p,["esc"])},null,8,["value","onKeyup"]),o.value.length>0?((0,n.wg)(),(0,n.j4)((0,r.SU)(P),{key:0,results:o.value,onSuggestionClick:_},null,8,["results"])):(0,n.kq)("",!0),(0,n._)("div",J,[(0,n.Wm)((0,r.SU)(q),{value:i.value.meta.type.level,"onUpdate:value":a[1]||(a[1]=e=>i.value.meta.type.level=e),class:"card-configurator__level",type:"number",label:"Lvl"},null,8,["value"]),(0,n.Wm)((0,r.SU)(q),{value:i.value.meta.type.school,"onUpdate:value":a[2]||(a[2]=e=>i.value.meta.type.school=e),class:"card-configurator__school",label:"School"},null,8,["value"])]),(0,n._)("div",Q,[(0,n.Wm)((0,r.SU)(q),{value:i.value.meta.castingTime,"onUpdate:value":a[3]||(a[3]=e=>i.value.meta.castingTime=e),class:"card-configurator__casting-time",label:"Casting time"},null,8,["value"]),(0,n.Wm)((0,r.SU)(q),{value:i.value.meta.range,"onUpdate:value":a[4]||(a[4]=e=>i.value.meta.range=e),class:"card-configurator__range",label:"Range"},null,8,["value"])]),(0,n._)("div",Z,[(0,n._)("div",X,[$,(0,n._)("div",ee,[(0,n.Wm)((0,r.SU)(M),{value:i.value.meta.components.verbal,"onUpdate:value":a[5]||(a[5]=e=>i.value.meta.components.verbal=e),character:"V"},null,8,["value"]),(0,n.Wm)((0,r.SU)(M),{value:i.value.meta.components.somatic,"onUpdate:value":a[6]||(a[6]=e=>i.value.meta.components.somatic=e),character:"S"},null,8,["value"]),(0,n.Wm)((0,r.SU)(M),{value:i.value.meta.components.material,"onUpdate:value":a[7]||(a[7]=e=>i.value.meta.components.material=e),character:"M"},null,8,["value"])])]),(0,n._)("div",ae,[(0,n.Wm)((0,r.SU)(q),{value:i.value.meta.duration,"onUpdate:value":a[8]||(a[8]=e=>i.value.meta.duration=e),class:"card-configurator__duration",label:"Duration"},null,8,["value"]),(0,n.Wm)((0,r.SU)(M),{value:i.value.meta.concentration,"onUpdate:value":a[9]||(a[9]=e=>i.value.meta.concentration=e),class:"card-configurator__concentration",character:"C"},null,8,["value"])])]),i.value.meta.components.material?((0,n.wg)(),(0,n.j4)((0,r.SU)(q),{key:1,value:i.value.meta.components.materialName,"onUpdate:value":a[10]||(a[10]=e=>i.value.meta.components.materialName=e),class:"card-configurator__material-name",label:"Material name"},null,8,["value"])):(0,n.kq)("",!0),(0,n.Wm)((0,r.SU)(q),{value:i.value.description,"onUpdate:value":a[11]||(a[11]=e=>i.value.description=e),textarea:!0,class:"card-configurator__description",label:"Description"},null,8,["value"]),(0,n.Wm)((0,r.SU)(q),{value:i.value.higherLevels,"onUpdate:value":a[12]||(a[12]=e=>i.value.higherLevels=e),textarea:!0,class:"card-configurator__higher-levels",label:"Higher levels"},null,8,["value"]),(0,n.Wm)((0,r.SU)(q),{value:i.value.textSize,"onUpdate:value":a[13]||(a[13]=e=>i.value.textSize=e),class:"card-configurator__text-size",type:"number",label:"Text Size"},null,8,["value"])])])):(0,n.kq)("",!0)}};const le=te;var ne=le;const re={key:0,class:"card-grid__controls"},ce={class:"card-grid__controls-inner"},ie=["src"],ue={class:"card-grid__control-flex"},oe=(0,n._)("label",{for:"printCardBack"}," Print Card back? ",-1),de={id:"printTarget",class:"card-grid__grid"},se=["src"],ve={key:1,class:"card-grid__configurator"};var pe={__name:"CardGrid",emits:["cardAddClick","update:cards"],setup(e,{emit:a}){const t=(0,r.iH)([]);(0,n.bv)((()=>{let e=localStorage.getItem("dndCards");null!==e&&(t.value=JSON.parse(e))}));const i=()=>{t.value.push({name:"New spell",meta:{type:{level:0,school:"Other"},castingTime:"1 action",range:"Self",components:{verbal:!0,somatic:!1,material:!1,materialName:""},duration:"Instantaneous",concentration:!1},textSize:12,description:"",higherLevels:""}),s.value=t.value.length-1,u()},u=()=>{localStorage.setItem("dndCards",JSON.stringify(t.value))},o=(0,n.Fl)((()=>{const e=t.value.length;return Math.ceil(e/9)})),d=(0,n.Fl)((()=>{const e=t.value.length;return e%9})),s=(0,r.iH)(),v=(0,r.iH)(!1),p=(0,r.iH)(null),_=(0,r.iH)(!1),m=()=>{u(),_.value=!0,(0,n.Y3)((()=>{window.print(),_.value=!1}))},g=(e,a)=>{s.value=s.value===f(e,a)?-1:f(e,a),u()},h=(e,a)=>{t.value.splice(f(e,a),1),s.value>=t.value.length&&s.value--,u()},f=(e,a)=>a-1+9*(e-1),y=e=>{let a=e.target.files||e.dataTransfer.files;a.length&&(p.value=URL.createObjectURL(a[0]))};return(e,a)=>((0,n.wg)(),(0,n.iD)("div",{class:(0,c.C_)(["card-grid",_.value&&"card-grid--print"])},[_.value?(0,n.kq)("",!0):((0,n.wg)(),(0,n.iD)("div",re,[(0,n._)("div",ce,[(0,n._)("button",{onClick:i}," Add card "),(0,n._)("button",{onClick:m}," Print cards "),(0,n._)("input",{type:"file",accept:"image/*",onChange:y},null,32),p.value?((0,n.wg)(),(0,n.iD)("img",{key:0,class:"card-grid__card-preview",src:p.value,alt:"Card back"},null,8,ie)):(0,n.kq)("",!0),(0,n._)("div",ue,[oe,(0,n.wy)((0,n._)("input",{id:"printCardBack","onUpdate:modelValue":a[0]||(a[0]=e=>v.value=e),type:"checkbox"},null,512),[[l.e8,v.value]])])])])),(0,n._)("div",de,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(o.value,(e=>((0,n.wg)(),(0,n.iD)("div",{key:e,class:(0,c.C_)(["card-grid__partition",1!==e&&"card-grid__page-break"])},[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(e===o.value?0===d.value?9:d.value:9,(a=>((0,n.wg)(),(0,n.iD)("div",{key:a,class:"card-grid__item"},[(0,n.Wm)((0,r.SU)(z),(0,n.dG)({class:"card-grid__card"},t.value[f(e,a)],{"is-current":s.value===f(e,a)&&!_.value,index:f(e,a),onEditButtonClick:t=>g(e,a),onDeleteButtonClick:t=>h(e,a)}),null,16,["is-current","index","onEditButtonClick","onDeleteButtonClick"])])))),128))],2)))),128)),((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(o.value,(e=>((0,n.wg)(),(0,n.iD)("div",{key:e,class:"card-grid__partition card-grid__page-break"},[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(e===o.value?0===d.value?9:d.value:9,(e=>((0,n.wg)(),(0,n.iD)("div",{key:e,class:"card-grid__item"},[p.value?((0,n.wg)(),(0,n.iD)("img",{key:0,class:"card-grid__card-back",src:p.value,alt:"Card back"},null,8,se)):(0,n.kq)("",!0)])))),128))])))),128))]),_.value?(0,n.kq)("",!0):((0,n.wg)(),(0,n.iD)("div",ve,[(0,n.Wm)((0,r.SU)(ne),{cards:t.value,"onUpdate:cards":a[1]||(a[1]=e=>t.value=e),"current-index":s.value,onUpdate:u},null,8,["cards","current-index"])]))],2))}};const _e=pe;var me=_e,ge={__name:"App",setup(e){return(e,a)=>((0,n.wg)(),(0,n.j4)((0,r.SU)(me)))}};const he=ge;var fe=he;let ye=(0,l.ri)(fe);ye.mount("#app")}},a={};function t(l){var n=a[l];if(void 0!==n)return n.exports;var r=a[l]={exports:{}};return e[l].call(r.exports,r,r.exports,t),r.exports}t.m=e,function(){var e=[];t.O=function(a,l,n,r){if(!l){var c=1/0;for(d=0;d<e.length;d++){l=e[d][0],n=e[d][1],r=e[d][2];for(var i=!0,u=0;u<l.length;u++)(!1&r||c>=r)&&Object.keys(t.O).every((function(e){return t.O[e](l[u])}))?l.splice(u--,1):(i=!1,r<c&&(c=r));if(i){e.splice(d--,1);var o=n();void 0!==o&&(a=o)}}return a}r=r||0;for(var d=e.length;d>0&&e[d-1][2]>r;d--)e[d]=e[d-1];e[d]=[l,n,r]}}(),function(){t.n=function(e){var a=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(a,{a:a}),a}}(),function(){t.d=function(e,a){for(var l in a)t.o(a,l)&&!t.o(e,l)&&Object.defineProperty(e,l,{enumerable:!0,get:a[l]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)}}(),function(){var e={143:0};t.O.j=function(a){return 0===e[a]};var a=function(a,l){var n,r,c=l[0],i=l[1],u=l[2],o=0;if(c.some((function(a){return 0!==e[a]}))){for(n in i)t.o(i,n)&&(t.m[n]=i[n]);if(u)var d=u(t)}for(a&&a(l);o<c.length;o++)r=c[o],t.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return t.O(d)},l=self["webpackChunkdnd_card_gen"]=self["webpackChunkdnd_card_gen"]||[];l.forEach(a.bind(null,0)),l.push=a.bind(null,l.push.bind(l))}();var l=t.O(void 0,[998],(function(){return t(4536)}));l=t.O(l)})();
//# sourceMappingURL=app.4f2d293e.js.map