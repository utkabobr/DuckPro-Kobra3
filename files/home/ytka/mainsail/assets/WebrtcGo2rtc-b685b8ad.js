import{m as p,B as m,G as g,P as d,W as l,R as f,C as _,n as v}from"./index-17a5ec1d.js";import{l as w,m as b,q as S}from"./vuetify-4c65b4c3.js";import"./overlayscrollbars-44d87bcf.js";import"./echarts-ff51454d.js";var y=Object.defineProperty,x=Object.getOwnPropertyDescriptor,c=(r,t,e,i)=>{for(var s=i>1?void 0:i?x(t,e):t,n=r.length-1,a;n>=0;n--)(a=r[n])&&(s=(i?a(t,e,s):a(s))||s);return i&&s&&y(t,e,s),s};let o=class extends p(m,g){constructor(){super(...arguments),this.pc=null,this.ws=null,this.restartPause=2e3,this.restartTimeout=null,this.status="connecting"}mounted(){this.start()}beforeDestroy(){this.terminate(),this.restartTimeout&&clearTimeout(this.restartTimeout)}get webcamStyle(){var t,e,i;return{transform:this.generateTransform((t=this.camSettings.flip_horizontal)!=null?t:!1,(e=this.camSettings.flip_vertical)!=null?e:!1,(i=this.camSettings.rotation)!=null?i:0)}}get url(){let t="",e=new URL(location.href);try{t=new URL(this.camSettings.stream_url).search.toString(),e=new URL("api/ws"+t,this.camSettings.stream_url)}catch{this.log("invalid url",this.camSettings.stream_url)}const i=["video"];return this.enableAudio&&i.push("audio"),e.searchParams.set("media",i.join("+")),e.protocol=this.$store.state.socket.protocol+":",e.searchParams.has("src")||this.log("no src set in url"),this.convertUrl(e.toString(),this.printerUrl)}get enableAudio(){var t,e;return(e=(t=this.camSettings.extra_data)==null?void 0:t.enableAudio)!=null?e:!1}changedUrl(){this.terminate(),this.start()}changedEnableAudio(){this.terminate(),this.start()}get expanded(){var t;return(t=this.$store.getters["gui/getPanelExpand"]("webcam-panel",this.viewport))!=null?t:!1}expandChanged(t){if(!t){this.terminate();return}this.start()}log(t,e){if(e){window.console.log("[WebRTC go2rtc] ".concat(t),e);return}window.console.log("[WebRTC go2rtc] ".concat(t))}start(){if(!this.video){this.scheduleRestart();return}this.log("connecting to "+this.url),this.status="connecting",this.pc=new RTCPeerConnection({iceServers:[{urls:"stun:stun.l.google.com:19302"}]});let t=[];["video","audio"].forEach(i=>{var n;const s=(n=this.pc)==null?void 0:n.addTransceiver(i,{direction:"recvonly"}).receiver.track;s&&t.push(s)}),this.video.srcObject=new MediaStream(t),this.ws=new WebSocket(this.url),this.ws.addEventListener("open",()=>this.onWebSocketOpen()),this.ws.addEventListener("message",i=>this.onWebSocketMessage(i)),this.ws.addEventListener("close",i=>this.onWebSocketClose(i))}onWebSocketOpen(){var t,e,i;this.log("open"),this.restartTimeout!==null&&(clearTimeout(this.restartTimeout),this.restartTimeout=null),(t=this.pc)==null||t.addEventListener("icecandidate",s=>{var a;if(!s.candidate)return;const n={type:"webrtc/candidate",value:s.candidate.candidate};(a=this.ws)==null||a.send(JSON.stringify(n))}),(e=this.pc)==null||e.addEventListener("connectionstatechange",()=>{var s,n;this.status=((n=(s=this.pc)==null?void 0:s.connectionState)!=null?n:"").toString(),this.log("connection state changed",this.status),["failed","disconnected"].includes(this.status)&&this.scheduleRestart()}),(i=this.pc)==null||i.createOffer().then(s=>{var n;return(n=this.pc)==null?void 0:n.setLocalDescription(s)}).then(()=>{var n,a,u;const s={type:"webrtc/offer",value:(a=(n=this.pc)==null?void 0:n.localDescription)==null?void 0:a.sdp};(u=this.ws)==null||u.send(JSON.stringify(s))})}onWebSocketMessage(t){var i,s;const e=JSON.parse(t.data);e.type==="webrtc/candidate"?(i=this.pc)==null||i.addIceCandidate({candidate:e.value,sdpMid:"0"}):e.type==="webrtc/answer"&&((s=this.pc)==null||s.setRemoteDescription({type:"answer",sdp:e.value}))}onWebSocketClose(t){this.log("close"),this.status="disconnected",t.wasClean||this.scheduleRestart()}terminate(){this.log("terminating"),this.pc!==null&&(this.pc.close(),this.pc=null),this.ws!==null&&(this.ws.close(),this.ws=null)}scheduleRestart(){this.restartTimeout===null&&(this.terminate(),this.restartTimeout=window.setTimeout(()=>{this.restartTimeout=null,this.start()},this.restartPause))}};c([d({required:!0})],o.prototype,"camSettings",2);c([d({default:null})],o.prototype,"printerUrl",2);c([f()],o.prototype,"video",2);c([l("url")],o.prototype,"changedUrl",1);c([l("enableAudio")],o.prototype,"changedEnableAudio",1);c([l("expanded",{immediate:!0})],o.prototype,"expandChanged",1);o=c([_],o);var C=function(){var r=this,t=r.$createElement,e=r._self._c||t;return e("div",[e("video",{directives:[{name:"show",rawName:"v-show",value:r.status==="connected",expression:"status === 'connected'"}],ref:"video",staticClass:"webcamImage",style:r.webcamStyle,attrs:{autoplay:"",playsinline:"",muted:""},domProps:{muted:!0}}),r.status!=="connected"?e(w,[e(b,{staticClass:"_webcam_webrtc_output text-center d-flex flex-column justify-center align-center"},[r.status==="connecting"?e(S,{staticClass:"mb-3",attrs:{indeterminate:"",color:"primary"}}):r._e(),e("span",{staticClass:"mt-3"},[r._v(r._s(r.status))])],1)],1):r._e()],1)},T=[];const h={};var W=v(o,C,T,!1,R,"9a120824",null,null);function R(r){for(let t in h)this[t]=h[t]}const U=function(){return W.exports}();export{U as default};
