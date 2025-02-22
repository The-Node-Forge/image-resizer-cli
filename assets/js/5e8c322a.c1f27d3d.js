"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[594],{48:(e,i,s)=>{s.r(i),s.d(i,{assets:()=>o,contentTitle:()=>a,default:()=>h,frontMatter:()=>l,metadata:()=>n,toc:()=>d});const n=JSON.parse('{"id":"api/index","title":"index","description":"License: MIT","source":"@site/docs/api/index.md","sourceDirName":"api","slug":"/api/","permalink":"/image-resizer-cli/docs/api/","draft":false,"unlisted":false,"editUrl":"https://github.com/The-Node-Forge/image-resizer-cli/tree/main/docs/docs/api/index.md","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Code of Conduct","permalink":"/image-resizer-cli/docs/CODE_OF_CONDUCT"},"next":{"title":"@the-node-forge/image-resizer-cli v1.1.0","permalink":"/image-resizer-cli/docs/api/globals"}}');var r=s(4848),t=s(8453);const l={},a="Image Resizer CLI",o={},d=[{value:"\u2728 Features",id:"-features",level:2},{value:"\ud83c\udfaf <strong>Supported Image Formats</strong>",id:"-supported-image-formats",level:2},{value:"\ud83d\udcda Installation",id:"-installation",level:2},{value:"\ud83c\udfaf <strong>List of Commands</strong>",id:"-list-of-commands",level:2},{value:"\ud83d\udee0\ufe0f <strong>Basic Usage</strong>",id:"\ufe0f-basic-usage",level:2},{value:"<strong>Resize an Image</strong>",id:"resize-an-image",level:3},{value:"<strong>Check the Resized File</strong>",id:"check-the-resized-file",level:3},{value:"<strong>Convert an Image Format</strong>",id:"convert-an-image-format",level:3},{value:"<strong>Batch Resize Multiple Images</strong>",id:"batch-resize-multiple-images",level:3},{value:"<strong>Compress an Image</strong>",id:"compress-an-image",level:3},{value:"<strong>Get Image Metadata</strong>",id:"get-image-metadata",level:3},{value:"\ud83d\udcda <strong>Custom Output File Naming</strong>",id:"-custom-output-file-naming",level:2},{value:"<strong>Example Custom Naming</strong>",id:"example-custom-naming",level:3},{value:"\ud83d\udc51 <strong>Contributing</strong>",id:"-contributing",level:2},{value:"\u2b50 Support",id:"-support",level:3},{value:"\ud83d\udd17 <strong>Links</strong>",id:"-links",level:3}];function c(e){const i={a:"a",br:"br",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{align:"center",children:[(0,r.jsx)(i.header,{children:(0,r.jsx)(i.h1,{id:"image-resizer-cli",children:"Image Resizer CLI"})}),(0,r.jsx)(i.p,{children:(0,r.jsx)(i.a,{href:"https://opensource.org/licenses/MIT",children:(0,r.jsx)(i.img,{src:"https://img.shields.io/badge/License-MIT-yellow.svg",alt:"License: MIT"})})}),(0,r.jsx)(i.p,{children:(0,r.jsx)(i.img,{src:"https://img.shields.io/badge/Made%20with-TypeScript-007acc",alt:"Made with TypeScript"})}),(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.a,{href:"https://www.npmjs.com/package/@the-node-forge/image-resizer-cli",children:(0,r.jsx)(i.img,{src:"https://img.shields.io/npm/v/@the-node-forge/image-resizer-cli",alt:"NPM Version"})}),"\n",(0,r.jsx)(i.a,{href:"https://github.com/The-Node-Forge/image-resizer-cli/actions",children:(0,r.jsx)(i.img,{src:"https://img.shields.io/github/actions/workflow/status/the-node-forge/image-resizer-cli/ci.yaml?branch=main",alt:"Build Status"})}),"\n",(0,r.jsx)(i.img,{src:"https://img.shields.io/badge/platform-CLI%20%7C%20Linux%20%7C%20macOS%20%7C%20Windows-blue",alt:"Platform"})]}),(0,r.jsx)(i.p,{children:(0,r.jsx)(i.a,{href:"https://the-node-forge.github.io/image-resizer-cli/",children:"Live Documentation"})})]}),"\n",(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:"Image Resizer CLI is a fast, lightweight, and versatile Node.js CLI tool for\nresizing, converting, compressing, and optimizing images in JPEG, PNG, WebP, and\nother formats. It supports batch processing, custom dimensions, and high-quality\ncompression using sharp. Ideal for developers, designers, and automation workflows\nneeding quick and efficient image manipulation directly from the command line."})}),"\n",(0,r.jsx)(i.hr,{}),"\n",(0,r.jsx)(i.h2,{id:"-features",children:"\u2728 Features"}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:["\u2705 ",(0,r.jsx)(i.strong,{children:"Resize Images"})," \u2013 Easily scale images to custom dimensions."]}),"\n",(0,r.jsxs)(i.li,{children:["\u2705 ",(0,r.jsx)(i.strong,{children:"Batch Resize"})," \u2013 Resize multiple images at once."]}),"\n",(0,r.jsxs)(i.li,{children:["\u2705 ",(0,r.jsx)(i.strong,{children:"Convert Image Format"})," \u2013 Change images to PNG, JPG, WebP, and more."]}),"\n",(0,r.jsxs)(i.li,{children:["\u2705 ",(0,r.jsx)(i.strong,{children:"Compress Images"})," \u2013 Reduce file size while maintaining quality."]}),"\n",(0,r.jsxs)(i.li,{children:["\u2705 ",(0,r.jsx)(i.strong,{children:"Retrieve Image Metadata"})," \u2013 View image details (format, size, dimensions)."]}),"\n",(0,r.jsxs)(i.li,{children:["\u2705 ",(0,r.jsx)(i.strong,{children:"Cross-Platform"})," \u2013 Works on Windows, macOS, and Linux."]}),"\n",(0,r.jsxs)(i.li,{children:["\u2705 ",(0,r.jsx)(i.strong,{children:"Fast & Lightweight"})," \u2013 Uses ",(0,r.jsx)(i.code,{children:"sharp"})," for efficient processing."]}),"\n",(0,r.jsxs)(i.li,{children:["\u2705 ",(0,r.jsx)(i.strong,{children:"TypeScript Support"})," \u2013 Fully typed for safer development."]}),"\n"]}),"\n",(0,r.jsx)(i.hr,{}),"\n",(0,r.jsxs)(i.h2,{id:"-supported-image-formats",children:["\ud83c\udfaf ",(0,r.jsx)(i.strong,{children:"Supported Image Formats"})]}),"\n",(0,r.jsx)(i.p,{children:"This package supports the following image formats:"}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.strong,{children:"JPEG"})," (",(0,r.jsx)(i.code,{children:".jpg"}),", ",(0,r.jsx)(i.code,{children:".jpeg"}),")"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.strong,{children:"PNG"})," (",(0,r.jsx)(i.code,{children:".png"}),")"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.strong,{children:"WebP"})," (",(0,r.jsx)(i.code,{children:".webp"}),")"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.strong,{children:"TIFF"})," (",(0,r.jsx)(i.code,{children:".tiff"}),")"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.strong,{children:"AVIF"})," (",(0,r.jsx)(i.code,{children:".avif"}),")"]}),"\n"]}),"\n",(0,r.jsx)(i.hr,{}),"\n",(0,r.jsx)(i.h2,{id:"-installation",children:"\ud83d\udcda Installation"}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:"language-sh",children:"npm install -g @the-node-forge/image-resizer-cli\n"})}),"\n",(0,r.jsx)(i.p,{children:"or using Yarn:"}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:"language-sh",children:"yarn global add @the-node-forge/image-resizer-cli\n"})}),"\n",(0,r.jsx)(i.hr,{}),"\n",(0,r.jsxs)(i.h2,{id:"-list-of-commands",children:["\ud83c\udfaf ",(0,r.jsx)(i.strong,{children:"List of Commands"})]}),"\n",(0,r.jsxs)(i.table,{children:[(0,r.jsx)(i.thead,{children:(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.th,{children:(0,r.jsx)(i.strong,{children:"Command"})}),(0,r.jsx)(i.th,{children:(0,r.jsx)(i.strong,{children:"Description"})})]})}),(0,r.jsxs)(i.tbody,{children:[(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:"img-resizer resize <input> <output> --width <number> --height <number>"})}),(0,r.jsx)(i.td,{children:"Resize an image to specific dimensions"})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:"img-resizer convert <input> <output>"})}),(0,r.jsx)(i.td,{children:"Convert an image to a different format (e.g., PNG to JPG)"})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:"img-resizer batch-resize <inputDir> <outputDir> --width <number> --height <number>"})}),(0,r.jsx)(i.td,{children:"Resize all images in a directory"})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:"img-resizer compress <input> <output> --quality <number>"})}),(0,r.jsx)(i.td,{children:"Compress an image with adjustable quality (1-100)"})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:"img-resizer info <input>"})}),(0,r.jsx)(i.td,{children:"Display image metadata (format, size, dimensions)"})]})]})]}),"\n",(0,r.jsx)(i.hr,{}),"\n",(0,r.jsxs)(i.h2,{id:"\ufe0f-basic-usage",children:["\ud83d\udee0\ufe0f ",(0,r.jsx)(i.strong,{children:"Basic Usage"})]}),"\n",(0,r.jsx)(i.h3,{id:"resize-an-image",children:(0,r.jsx)(i.strong,{children:"Resize an Image"})}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:"language-bash",children:"img-resizer resize input.jpg output.jpg --width 300 --height 200\n"})}),"\n",(0,r.jsx)(i.h3,{id:"check-the-resized-file",children:(0,r.jsx)(i.strong,{children:"Check the Resized File"})}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:"language-bash",children:"ls -lh output.jpg  # Check file details\nopen output.jpg     # Open file (macOS)\nstart output.jpg    # Open file (Windows)\n"})}),"\n",(0,r.jsx)(i.h3,{id:"convert-an-image-format",children:(0,r.jsx)(i.strong,{children:"Convert an Image Format"})}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:"language-bash",children:"img-resizer convert input.jpg output.png\n"})}),"\n",(0,r.jsx)(i.h3,{id:"batch-resize-multiple-images",children:(0,r.jsx)(i.strong,{children:"Batch Resize Multiple Images"})}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:"language-bash",children:"img-resizer batch-resize images/ resized/ --width 500 --height 500\n"})}),"\n",(0,r.jsx)(i.h3,{id:"compress-an-image",children:(0,r.jsx)(i.strong,{children:"Compress an Image"})}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:"language-bash",children:"img-resizer compress input.jpg output.jpg --quality 80\n"})}),"\n",(0,r.jsx)(i.h3,{id:"get-image-metadata",children:(0,r.jsx)(i.strong,{children:"Get Image Metadata"})}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:"language-bash",children:"img-resizer info input.jpg\n"})}),"\n",(0,r.jsx)(i.hr,{}),"\n",(0,r.jsxs)(i.h2,{id:"-custom-output-file-naming",children:["\ud83d\udcda ",(0,r.jsx)(i.strong,{children:"Custom Output File Naming"})]}),"\n",(0,r.jsxs)(i.p,{children:["When using ",(0,r.jsx)(i.code,{children:"img-resizer"}),", you can name the output file ",(0,r.jsx)(i.strong,{children:"whatever you want"}),",\nincluding setting a custom directory."]}),"\n",(0,r.jsx)(i.h3,{id:"example-custom-naming",children:(0,r.jsx)(i.strong,{children:"Example Custom Naming"})}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:"language-bash",children:"img-resizer resize input.jpg my_custom_name.png --width 400 --height 300\n"})}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:["Output file: ",(0,r.jsx)(i.code,{children:"my_custom_name.png"})]}),"\n"]}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:"language-bash",children:"img-resizer resize input.jpg /images/optimized-photo.webp --width 600 --height 400\n"})}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:["Output file: ",(0,r.jsx)(i.code,{children:"/images/optimized-photo.webp"})]}),"\n"]}),"\n",(0,r.jsxs)(i.p,{children:["If the output directory doesn\u2019t exist, it will be ",(0,r.jsx)(i.strong,{children:"automatically created"}),"."]}),"\n",(0,r.jsx)(i.hr,{}),"\n",(0,r.jsxs)(i.h2,{id:"-contributing",children:["\ud83d\udc51 ",(0,r.jsx)(i.strong,{children:"Contributing"})]}),"\n",(0,r.jsxs)(i.p,{children:["Contributions are welcome! Please submit",(0,r.jsx)(i.br,{}),"\n",(0,r.jsx)(i.a,{href:"https://github.com/The-Node-Forge/image-resizer-cli/issues",children:"issues"})," or",(0,r.jsx)(i.br,{}),"\n",(0,r.jsx)(i.a,{href:"https://github.com/The-Node-Forge/image-resizer-cli/pulls",children:"pull requests"}),"."]}),"\n",(0,r.jsx)(i.hr,{}),"\n",(0,r.jsx)(i.h3,{id:"-support",children:"\u2b50 Support"}),"\n",(0,r.jsxs)(i.p,{children:["If you find this package useful, please ",(0,r.jsx)(i.strong,{children:"give it a \u2b50 on"}),(0,r.jsx)(i.br,{}),"\n",(0,r.jsx)(i.a,{href:"https://github.com/The-Node-Forge/image-resizer-cli",title:"GitHub Repository",children:"GitHub"})]}),"\n",(0,r.jsx)(i.hr,{}),"\n",(0,r.jsxs)(i.h3,{id:"-links",children:["\ud83d\udd17 ",(0,r.jsx)(i.strong,{children:"Links"})]}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:["\ud83d\udcda ",(0,r.jsx)(i.a,{href:"https://www.npmjs.com/package/@the-node-forge/image-resizer-cli",children:"NPM Package"})]}),"\n",(0,r.jsxs)(i.li,{children:["\ud83c\udfe0 ",(0,r.jsx)(i.a,{href:"https://github.com/The-Node-Forge",children:"The Node Forge"})]}),"\n"]})]})}function h(e={}){const{wrapper:i}={...(0,t.R)(),...e.components};return i?(0,r.jsx)(i,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},8453:(e,i,s)=>{s.d(i,{R:()=>l,x:()=>a});var n=s(6540);const r={},t=n.createContext(r);function l(e){const i=n.useContext(t);return n.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function a(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),n.createElement(t.Provider,{value:i},e.children)}}}]);