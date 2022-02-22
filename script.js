const usbDetect = require('usb-detection');
const exec = require('child_process').exec;
const lunchpad = "Lunchpad.exe";
const synapse = "Razer Synapse 3.exe"
const lunchpadPath = `C:\\Users\\Shadow\\AppData\\Local\\Programs\\lunchpad\\${lunchpad}`;
const synapsePath = `C:\\"Program Files (x86)"\\Razer\\Synapse3\\WPFUI\\Framework\\"Razer Synapse 3 Host"\\"${synapse}"`;
const launchpadVendorID = 4661;
const razerVendorID = 5426;

const razerExes = [synapse, 'Razer Central.exe', 'Razer Synapse Service Process.exe', 'Razer Synapse Service.exe', 'RazerCentralService.exe']


function killAllInstances(flag, exe_name, device){

	let str = '';
	if (flag === 'F')
		str = ' /F';
	
	//we need to wrap the exe names into quotation marks so that Windows treat these as a single string
	if (device.vendorId === razerVendorID){
		for (const e of razerExes)
			exec(`TASKKILL /IM "${e}"` + str, function (error, stdout, stderr) {
				if (error !== null)
					console.log('exec error: ' + error);
		});
	}

	//Will only get executed if the launchpad gets removed
	else 
		exec(`TASKKILL /IM "${exe_name}"` + str, function (error, stdout, stderr) {
			if (error !== null)
				console.log('exec error: ' + error);
	});


}


usbDetect.startMonitoring();


usbDetect.find(function(err, devices) {
	for (const device of devices){
        	if (device.vendorId === launchpadVendorID){
            		exec(lunchpadPath, function (error, stdout, stderr) {
                		if (error !== null) {
                        		console.log('exec error within find: ' + error);
                		}
            	});
              break;
          }
          if (device.vendorId === razerVendorID){
            	  exec(synapsePath, function (error, stdout, stderr) {
                		if (error !== null) {
                        		console.log('exec error within find: ' + error);
                		}
            	});
              break;
          }
}});

usbDetect.on('add', function(device) {
   	if (device.vendorId === launchpadVendorID){
       		exec(lunchpadPath,
        	function (error, stdout, stderr) {
        		if (error !== null) {
                   		console.log('exec error within on: ' + error);
            }
        	});
    }
    if (device.vendorId === razerVendorID){
          exec(synapsePath,
        	function (error, stdout, stderr) {
        	    if (error !== null) {
                console.log('exec error within on: ' + error);
              }
        	});
    }
       
});

usbDetect.on('remove', function(device) {
	
  if (device.vendorId === launchpadVendorID)
    killAllInstances('F', lunchpad, device);
  
  if (device.vendorId === razerVendorID)
    killAllInstances('F', synapse, device);
   
    
});