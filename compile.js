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
                arr.push({tag:'note', pitch:convertPitch(expr.pitch), start:time,dur:expr.dur});
                time+=expr.dur;
            }
            else if(expr.tag=='rest')
            {
                arr.push({tag:'rest', start:time,dur:expr.dur});
                time+=expr.dur;
            }
            else if(expr.tag=='par')
            {
                var temp=time;
                internalCompiler(expr.left);
                time=temp;
                internalCompiler(expr.right);
            }
            else if(expr.tag=='repeat')
            {
                for(i=0;i<expr.count;i++)
                {
                    internalCompiler(expr.section);
                }
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

function convertPitch(pitch)
{
    var dict={'A':9,'E':4,'C':0,'B':11,'D':2,'F':5,'G':7};
    var numDict={'0':0,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8};
    var ret=12+12*dict[pitch[0].toUpperCase()]+numDict[pitch[1]];
    return ret;
}
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
