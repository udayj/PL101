var endTime = function (time, expr) {
    // your code here
    var calcDur=function(newexpr){
        if (newexpr.tag=='note')
        {
            return newexpr.dur;
        }
        else
        {
            return calcDur(newexpr.left)+calcDur(newexpr.right);
        }
    };
    return time+calcDur(expr);
};

// maybe some helper functions

var compile = function (musexpr) {
    
    time=0;
    arr=[];
    var internalCompiler= function(expr)
        {
            if(expr.tag=='note')
            {
                arr.push({tag:'note', pitch:expr.pitch, start:time,dur:expr.dur});
                time+=expr.dur;
            }
            else if(expr.tag=='rest')
            {
                arr.push({tag:'rest', start:time,dur:expr.dur});
                time+=expr.dur;
            }
            else
            {
                internalCompiler(expr.left);
                internalCompiler(expr.right);
            }
        };
    internalCompiler(musexpr);
    return arr;
    
};

var melody_mus = 
    { tag: 'seq',
      left: 
       { tag: 'seq',
         left: { tag: 'note', pitch: 'a4', dur: 250 },
         right: { tag: 'note', pitch: 'b4', dur: 250 } },
      right:
       { tag: 'seq',
         left: { tag: 'note', pitch: 'c4', dur: 500 },
         right: { tag: 'note', pitch: 'd4', dur: 500 } } };

console.log(melody_mus);
console.log(compile(melody_mus));
