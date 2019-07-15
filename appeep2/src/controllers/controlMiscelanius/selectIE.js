

    $(document).ready(function(){ 
          $("input[name=browser]").change(function() {
                var sedes=$("input[name=browser]").val();
				$(institucion).val(sedes);
                alert(sedes);
                
                const xhttp = new XMLHttpRequest();
                xhttp.open('GET','/controlMiscelanius/dirEE.json',true);
                xhttp.send();
                xhttp.onreadystatechange =function(){
                    // let control=0;
                    if (this.readyState==4 && this.status==200)
                    {
                      let EE= JSON.parse(this.responseText);
                      for( let sede of EE){
                   
                        if (sede.NOMBRESEDE==sedes){
                            document.getElementById('coddane').value= sede.DANEESTABLECIMIENTO;
                            document.getElementById('consecutivodane').value=sede.CONSECUTIVODANE;
                            document.getElementById('comuna').value=sede.COMUNA;
                            document.getElementById('nucleo').value=sede.NUCLEO;
                        }else if (sedes==""){
                            document.getElementById('coddane').value= "";
                            document.getElementById('consecutivodane').valuevalue= "";
                            document.getElementById('comuna').value=value= "";
                            document.getElementById('nucleo').value=value= "";
                        }
                      }
                    }
                }
            });

        



	});
