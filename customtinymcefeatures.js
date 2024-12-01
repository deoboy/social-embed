var globalURL = 'https://' + location.host + '/';
     
(function() {
    tinymce.PluginManager.add('custom_mce_button', function(editor, url) {
      editor.addButton('custom_mce_button_short', {
        type: 'menubutton',
        image: globalURL + 'wp-content/themes/socialmebed/images/powerscript2.png',
        icon: true,
        text: 'Social Embed Script Upload',
            onclick: function() {		 
                editor.windowManager.open({
                    title: 'Power Automedia Embed Script',  
                    type: 'panel',          
                    body: [
                        {
                            type: 'listbox', // Dropdown menu
                            name: 'typess',
                            label:  'Types',
                            values: [
                                {  text: 'Select' ,value:''},
                                {  text: 'Youtube' ,value:'youtube'},
                                {  text: 'Instagram',value:'instagram' } ,
                                {  text: 'Facebook',value:'facebook' } ,
                                {  text: 'Tiktok',value:'tiktok' } ,
                                {  text: 'Twitter',value:'twitter' } ,
                                { text: '-----------------', value: 'divider', disabled: true },  
                                {  text: 'Google Map',value:'gmap' } ,
                                {  text: 'Custom Javascript',value:'cjavascript' } ,
                                {  text: 'Custom HTML',value:'chtml' } ,
                                
                    ],
                    onselect: function(e, details) {
                         const widthsid = document.getElementById('widthsid');
                         const heightsid = document.getElementById('heightsid');
                                switch(this.value()){
                                case 'gmap':
                                case 'facebook':
                                case 'youtube':                                 
                                        widthsid.style.visibility="visible";         
                                        heightsid.style.visibility="visible";
                                        break;
                                case 'cjavascript':
                                case 'chtml':
                                case 'twitter':
                                case 'tiktok':        
                                case 'instagram':    
                                        widthsid.style.visibility="hidden";        
                                        heightsid.style.visibility="hidden";
                                        break;                         
                              
                                    
                            }      
                      },
             
                            maxWidth: 190, 
                    
                           
                        },
                        {
                        type: 'textbox',
                     
						name:'title',
                        placeholder: 'Enter the text for the tooltip...',
                        minWidth: 300, 
                        minHeight: 200 
                      
                    },
                    
                    {
                        type: 'listbox', // Dropdown menu
                        name: 'alignments',
                        label:  'Alignment',
                        values: [
                           {  text: 'Select' ,value:''},
                           {  text: 'Left' ,value:'left'},
                           {  text: 'Center' ,value:'center'},
                           {  text: 'Right' ,value:'right'},
                           
                            
                ],     maxWidth: 190,              
                     
                    },
                    {
                        type: 'textbox',
                        name: 'Widths',
                        label: 'Width',
                        placeholder: 'Enter value for Width',
                        hidden: false,
                        onPostRender: function() {
                            // Add a custom ID to the textbox
                            const controlElementw = this.getEl();
                            if (controlElementw) {
                              controlElementw.setAttribute('id', 'widthsid');
                            }
                          
                        } 
                    },
                    {
                        type: 'textbox',
                        name: 'Heights',
                        label: 'Height',
                        placeholder: 'Enter value for height',
                        hidden: false ,
                        onPostRender: function() {
                            // Add a custom ID to the textbox
                            const controlElementh = this.getEl();
                            if (controlElementh) {
                              controlElementh.setAttribute('id', 'heightsid');
                            }
                          
                        } 
                    },

                ],
         
                    onsubmit: function(e) {
                        let alignm=e.data.alignments;
                        let content=e.data.title;
                        let ww=e.data.Widths;
                        let hh=e.data.Heights;
                        let socials=[];
                        const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/g;
                        socials[0]=content.match(/youtube/i); 
                        socials[1]=content.match(/instagram/i); 
                        socials[2]=content.match(/facebook/i); 
                        socials[3]=content.match(/tiktok/i); 
                        socials[4]=content.match(/twitter/i); 
                        socials[5]=content.match(/maps/i); 
                        socials[6]=content.match(scriptRegex); 
                        socials[7]=content.match(/<\/?[a-z][\s\S]*>/i); 
                                switch(e.data.typess) 
                                {
                                    case 'youtube':                    
                                        youTubeEmbedPA(socials[0],content,ww,hh,alignm);
                                        break;
                                    case 'instagram':                               
                                        instagramEmbedPA(socials[1],content,alignm);       
                                        break;
                                    case 'facebook':                            
                                        facebookEmbedPA(socials[2],content,ww,hh,alignm);                       
                                        break;
                                    case 'tiktok':
                                        tiktokEmbedPA(socials[3],content,alignm);                       
                                        break;
                                    case 'twitter':
                                        twitterEmbedPA(socials[4],content,alignm);                            
                                        break;
                                    case 'gmap':
                                        googleMapEmbedPA(socials[5],content,ww,hh,alignm);                              
                                        break;
                                    case 'cjavascript':
                                        javascriptsEmbedPA(socials[6]);                            
                                        break;
                                    case 'chtml':
                                        htmlEmbedPA(socials[7],content,alignm);                            
                                        break;                                    
                                    default:                                                  
                                        editor.insertContent(loadAlignmentPA(alignm,e.data.title));
                                }   



                          
                          /*** Start YOUTUBE ***/
                          function youTubeEmbedPA(socialsy,content,ww,hh,alignm="center"){
                            if(socialsy!=="" && socialsy!==null){                                                         
                                if(ww!=="" && hh!==""){                          
                                let newContentw = content.replace(/width="[^"]*"/, "width="+ ww);
                                let newContentwh = newContentw.replace(/height="[^"]*"/, "height="+ hh);
                                editor.insertContent('<div style="outline:4px dotted #00b295" class="smembedoutlined">' +loadAlignmentPA(alignm,newContentwh) +'</div>');                        
                                }
                                else  if(ww!=="" && hh===""){                                 
                                    let newContentw = content.replace(/width="[^"]*"/, "width="+ ww);                                 
                                    editor.insertContent('<div style="outline:4px dotted #00b295" class="smembedoutlined">' +loadAlignmentPA(alignm,newContentw) +'</div>');
                                }                        
                                else  if(ww==="" && hh!==""){                                                      
                                    let newContentwh = content.replace(/height="[^"]*"/, "height="+ hh);
                                    editor.insertContent('<div style="outline:4px dotted #00b295" class="smembedoutlined">' +loadAlignmentPA(alignm,newContentwh) +'</div>');
                                }
                                else{                                                      
                                    editor.insertContent('<div style="outline:4px dotted #00b295" class="smembedoutlined">' +loadAlignmentPA(alignm,e.data.title) +'</div>');
                                }
                            }
                                else{
                                    alert("You uploaded a code that is not for Youtube but for " +  socialNamesPA(socials));                                  
                                }
                        
                        } 
                            /*** End YOUTUBE ***/

                            /*** Start INSTAGRAM ***/
                            function   instagramEmbedPA(socialsi,content,alignm="center"){

                              
                                if(socialsi!=="" && socialsi!==null)
                                    {
                                                                                            
                                           editor.insertContent('<div style="outline:4px dotted #00b295"  class="smembedoutlined">' +loadAlignmentPA(alignm,e.data.title) +'</div>');
                                              
                                   }
                                   else{
                                       alert("You uploaded a code that is not for Instagram but for " +  socialNamesPA(socials));                                     
                                   }
       
                            }
                            /*** End INTAGRAM ***/
                            /*** Start FACEBOOK ***/
                              function   facebookEmbedPA(socialsf,content,ww,hh,alignm="center"){
                                if(socialsf!=="" && socialsf!==null){
                                    if(ww!=="" && hh!==""){                                
                                       let newContentw = content.replace(/width="[^"]*"/, "width="+ ww);
                                       let newContentwh = newContentw.replace(/height="[^"]*"/, "height="+ hh);
                                       editor.insertContent('<div style="outline:4px dotted #00b295" class="smembedoutlined">' +loadAlignmentPA(alignm,newContentwh) +'</div>');                           
                                       }
                                       else  if(ww!=="" && hh===""){                                       
                                           let newContentw = content.replace(/width="[^"]*"/, "width="+ ww);                                 
                                           editor.insertContent('<div style="outline:4px dotted #00b295" class="smembedoutlined">' +loadAlignmentPA(alignm,newContentw) +'</div>');
                                       }       
                                       else  if(ww==="" && hh!==""){                                                                 
                                           let newContentwh = content.replace(/height="[^"]*"/, "height="+ hh);
                                           editor.insertContent('<div style="outline:4px dotted #00b295" class="smembedoutlined">' +loadAlignmentPA(alignm,newContentwh) +'</div>');
                                       }
                                       else{                                                             
                                           editor.insertContent('<div style="outline:4px dotted #00b295" class="smembedoutlined">' +loadAlignmentPA(alignm,e.data.title) +'</div>');
                                       }      
                                   }
                                   else{
                                       alert("You uploaded a code that is not for Facebook but for " +  socialNamesPA(socials));                                     
                                   }
       
                            }
                            /*** End FACEBOOK ***/
                             /*** Start TIKTOK ***/
                            function   tiktokEmbedPA(socialst,content,ww,hh,alignm="center"){
                                if(socialst!=="" && socialst!==null){
                                    
                                                                                                  
                                           editor.insertContent('<div style="outline:4px dotted #00b295" class="smembedoutlined">' +loadAlignmentPA(alignm,e.data.title)+'</div>');
                                          
                                   }
                                   else{
                                       alert("You uploaded a code that is not for Tiktok but for " +  socialNamesPA(socials));                                     
                                   }       
                              }
                            /*** End TIKTOK ***/
                            /*** Start TWITTER ***/
                                function   twitterEmbedPA(socialst,content,alignm="center"){
                                    if(socialst!=="" && socialst!==null){
                                                                                                       
                                               editor.insertContent('<div style="outline:4px dotted #00b295" class="smembedoutlined" >' +loadAlignmentPA(alignm,e.data.title)+'</div>');
                                                   
                                       }
                                       else{
                                           alert("You uploaded a code that is not for Twitter but for " +  socialNamesPA(socials));                                         
                                       }
           
                                }
                                /*** End TWITTER ***/


                                function googleMapEmbedPA(socialsg,content,ww,hh,alignm="center"){
                                    if(socialsg!=="" && socialsg!==null){                                                         
                                        if(ww!=="" && hh!==""){                          
                                        let newContentw = content.replace(/width="[^"]*"/, "width="+ ww);
                                        let newContentwh = newContentw.replace(/height="[^"]*"/, "height="+ hh);
                                        editor.insertContent('<div style="outline:4px dotted #00b295" class="smembedoutlined">' +loadAlignmentPA(alignm,newContentwh) +'</div>');                        
                                        }
                                        else  if(ww!=="" && hh===""){                                 
                                            let newContentw = content.replace(/width="[^"]*"/, "width="+ ww);                                 
                                            editor.insertContent('<div style="outline:4px dotted #00b295" class="smembedoutlined">' +loadAlignmentPA(alignm,newContentw) +'</div>');
                                        }                        
                                        else  if(ww==="" && hh!==""){                                                      
                                            let newContentwh = content.replace(/height="[^"]*"/, "height="+ hh);
                                            editor.insertContent('<div style="outline:4px dotted #00b295" class="smembedoutlined">' +loadAlignmentPA(alignm,newContentwh) +'</div>');
                                        }
                                        else{                                                      
                                            editor.insertContent('<div style="outline:4px dotted #00b295" class="smembedoutlined">' +loadAlignmentPA(alignm,e.data.title) +'</div>');
                                        }
                                    }
                                        else{
                                            alert("You uploaded a code that is not for Google Map but for " +  socialNamesPA(socials));                                  
                                        }
                                
                                } 

                                /*** Start JAVASCRIPT ***/
                                       function   javascriptsEmbedPA(socialsj){
 
                                     
                                        if(socialsj!=="" && socialsj!==null){
                                                                                                           
                                                   editor.insertContent('<div style="outline:4px dotted #00b295" class="smembedoutlined">' + e.data.title +'</div>');
                                                       
                                           }
                                           else{
                                               alert("You uploaded a code that is not for Javascript but for " +  socialNamesPA(socials));                                         
                                           }
               
                                    }
                                /*** End JAVASCRIPT ***/

                                /*** Start HTML ***/
                                        function   htmlEmbedPA(socialsh,content,alignm="center"){
                                            if(socialsh!=="" && socialsh!==null){
                                                                                                               
                                                       editor.insertContent('<div style="outline:4px dotted #00b295" class="smembedoutlined">' +loadAlignmentPA(alignm,e.data.title)+'</div>');
                                                           
                                               }
                                               else{
                                                   alert("You uploaded a code that is not for HTML but for " +  socialNamesPA(socials));                                         
                                               }
                   
                                        }
                              /*** End HTML***/



                       
                      } 
                 });
            }
        });
    });
}) ();

function emptyVarPA(emptyVals){
    emptyVals=== "" ?  emptyVals :  '';
}

function nullVarPA(empvarspa){
      empvarspa=== null ?  empvarspa :  '';
}

function loadAlignmentPA(alignm,finalcontent){
    switch(alignm) {
        case 'left':
           return "<div class='smembedoutlinedleft'>"+ finalcontent +  "</div>";
           break;
        case 'center':
            return "<div class='smembedoutlinedcenter'>"+ finalcontent +  "</div>";
            break;
        case 'right':
            return "<div class='smembedoutlinedright'>"+ finalcontent +  "</div>";
            break;
        default:
            return "<div class='smembedoutlinedcenter'>"+ finalcontent +  "</div>";
            break;    
    }
}

function socialNamesPA(socials)
{
   for (let i = 0; i <= 4; i++) 
    {
        if(socials[i]!==null)
            {
            return socials[i];
          return false;
            }
    }      
}