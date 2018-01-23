var fs=require('fs')
var request=require('request')
var done=require('./bash')
console.log(done)
module.exports = {
  pwd: function(args, done) {
	done(process.cwd())
  },
  date: function(args,done){
	done(Date())
  },
  ls: function(args,done){
  	fs.readdir('.', function(err, files) {
		  if (err) throw err;
		  files.forEach(function(file) {
		    done(file.toString() + "\n");
		  })
  	});
  },
  echo: function(spl,done){
  	var str=''
  	for (var i = 1; i < spl.length; i++) {
  		str+=spl[i]+' '
  	}
  	 done(str)
  },
  cat: function(spl,done){
  	fs.readFile(spl[1], 'utf8', function(err,data){
  		if(err){throw err};
  		done(data)
  	})
  },
  head: function(spl,done){
  	fs.readFile(spl[1], 'utf8', function(err,data){
  		var splet=data.split('\n')
  		if(err){throw err};
  		var str=''
  		for (var i = 0; i < 5; i++) {
  			str+=splet[i]+'\n'
  		}
  		done(str)
  	})
  },
  tail: function(spl,done){
  	fs.readFile(spl[1], 'utf8', function(err,data){
  		var splet=data.split('\n')
  		if(err){throw err};
  		var str=''
  		for (var i = splet.length-5; i < splet.length; i++) {
  			str+=splet[i]+'\n'
  		}
  		done(str)
  	})
  },
  sort: function(spl,done){
  		fs.readFile(spl[1], 'utf8', function(err,data){
  		var splet=data.split('\n').sort()
	  		if(err){throw err}; 		
	  		var str=''
	  		for (var i = 0; i < splet.length; i++) {
	  			str+=splet[i]+'\n'
	  		}
	  		done(str)
  		})
  },
  wc: function(spl,done){
  	fs.readFile(spl[1], 'utf8', function(err,data){
  		var splet=data.split('\n')
  		var splet2=splet.join().split(' ')
	  		if(err){throw err}; 		
	  		var str=''
	  		for (var i = 0; i < splet.length; i++) {
	  			str+=splet[i]+'\n'
	  		}
	  		done(splet.length+' '+splet2.length+' '+data.length)
  		})  	
  },
  uniq: function(spl,done){
  	fs.readFile(spl[1], 'utf8', function(err,data){
	  	var sort1=data.split('\n').sort()
	  	if(err){throw err};
	  	var str=''
	  	for (var i = 0; i < sort1.length; i++) {
	  		if (sort1[i+1]!==sort1[i]) {
	  			str+=sort1[i]+'\n'
	  		}
	  	}

  		done(str)
	})
  },
  curl: function(spl,done){
  	request(spl[1],function(err,response,body){
  		done('body',body);

  	})
  },
  find: function(spl,done){
  	ls(spl.toString(),done)
  	for (var i = 0; i < spl.length; i++) {
  		done(find(spl[i]),done)
  	}
  },
}