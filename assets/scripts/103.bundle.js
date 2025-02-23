"use strict";(self.webpackChunkyideng_contract=self.webpackChunkyideng_contract||[]).push([[103],{9103:(e,a,t)=>{t.d(a,{offchainLookup:()=>g,offchainLookupSignature:()=>m});var s=t(8879),r=t(5624),n=t(1285),o=t(5810);class c extends n.C{constructor({callbackSelector:e,cause:a,data:t,extraData:s,sender:r,urls:n}){super(a.shortMessage||"An error occurred while fetching for an offchain result.",{cause:a,metaMessages:[...a.metaMessages||[],a.metaMessages?.length?"":[],"Offchain Gateway Call:",n&&["  Gateway URL(s):",...n.map((e=>`    ${(0,o.I)(e)}`))],`  Sender: ${r}`,`  Data: ${t}`,`  Callback selector: ${e}`,`  Extra data: ${s}`].flat(),name:"OffchainLookupError"})}}class d extends n.C{constructor({result:e,url:a}){super("Offchain gateway response is malformed. Response data must be a hex value.",{metaMessages:[`Gateway URL: ${(0,o.I)(a)}`,`Response: ${(0,r.A)(e)}`],name:"OffchainLookupResponseMalformedError"})}}class u extends n.C{constructor({sender:e,to:a}){super("Reverted sender address does not match target contract address (`to`).",{metaMessages:[`Contract address: ${a}`,`OffchainLookup sender address: ${e}`],name:"OffchainLookupSenderMismatchError"})}}var i=t(7950),l=t(7417),f=t(9881),p=t(9603),h=t(1306),y=t(732),w=t(235);const m="0x556f1830",b={name:"OffchainLookup",type:"error",inputs:[{name:"sender",type:"address"},{name:"urls",type:"string[]"},{name:"callData",type:"bytes"},{name:"callbackFunction",type:"bytes4"},{name:"extraData",type:"bytes"}]};async function g(e,{blockNumber:a,blockTag:t,data:r,to:n}){const{args:o}=(0,l.W)({data:r,abi:[b]}),[d,i,w,m,g]=o,{ccipRead:C}=e,x=C&&"function"==typeof C?.request?C.request:k;try{if(!function(e,a){if(!(0,h.P)(e,{strict:!1}))throw new p.M({address:e});if(!(0,h.P)(a,{strict:!1}))throw new p.M({address:a});return e.toLowerCase()===a.toLowerCase()}(n,d))throw new u({sender:d,to:n});const r=await x({data:w,sender:d,urls:i}),{data:o}=await(0,s.T)(e,{blockNumber:a,blockTag:t,data:(0,y.xW)([m,(0,f.h)([{type:"bytes"},{type:"bytes"}],[r,g])]),to:n});return o}catch(e){throw new c({callbackSelector:m,cause:e,data:r,extraData:g,sender:d,urls:i})}}async function k({data:e,sender:a,urls:t}){let s=new Error("An unknown error occurred.");for(let n=0;n<t.length;n++){const o=t[n],c=o.includes("{data}")?"GET":"POST",u="POST"===c?{data:e,sender:a}:void 0,l="POST"===c?{"Content-Type":"application/json"}:{};try{const t=await fetch(o.replace("{sender}",a).replace("{data}",e),{body:JSON.stringify(u),headers:l,method:c});let n;if(n=t.headers.get("Content-Type")?.startsWith("application/json")?(await t.json()).data:await t.text(),!t.ok){s=new i.Ci({body:u,details:n?.error?(0,r.A)(n.error):t.statusText,headers:t.headers,status:t.status,url:o});continue}if(!(0,w.q)(n)){s=new d({result:n,url:o});continue}return n}catch(e){s=new i.Ci({body:u,details:e.message,url:o})}}throw s}}}]);