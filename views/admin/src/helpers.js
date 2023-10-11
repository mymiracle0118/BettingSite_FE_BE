export default {
    toCurrency(value) {
        if(value != undefined){
	        value = parseFloat(value)
	        value = value.toLocaleString('EN-IN', {'minimumFractionDigits':0,'maximumFractionDigits':2});
	    }else{
	        value = ""
	    }
	    return value
    },
    toCurrencyInt(value) {

        if(value != undefined){
	        value = parseInt(value)
	        value = value.toLocaleString('EN-IN');
	    }else{
	        value = ""
	    }
	    return value
    },
    toggleSideBar() {
    	//console.log("here")
      

      if (window.screen.width >= 992) {
        // eslint-disable-next-line no-unused-vars
       // document.body.classList.toggle("vertical-collpsed");
      } else {
      	document.body.classList.toggle("sidebar-enable");
        // eslint-disable-next-line no-unused-vars
        document.body.classList.remove("vertical-collpsed");
      }
    },
    scrollToId(id){
      let elmnt = document.getElementById(id);
      window.scrollTo({
        top: elmnt.offsetTop,
        behavior: 'smooth'
      });
    }
}