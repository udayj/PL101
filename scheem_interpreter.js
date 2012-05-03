
var evalScheem = function (expr, env) {
    // Numbers evaluate to themselves
    if (typeof expr === 'number') {
        return expr;
    }
    // Strings are variable references
    if (typeof expr === 'string') {
        return env[expr];
    }
    // Look at head of list for operation
    switch (expr[0]) {
        case '+':
            return evalScheem(expr[1], env) +
                   evalScheem(expr[2], env);
        case '-':
            return evalScheem(expr[1], env) -
                   evalScheem(expr[2], env);
        case '*':
            return evalScheem(expr[1], env) *
                   evalScheem(expr[2], env);
        case '/':
            return evalScheem(expr[1], env) /
                   evalScheem(expr[2], env);
        case 'begin':
            {
                var ret=0;
                for(i=1;i<expr.length;i++)
                {
                    ret=evalScheem(expr[i],env);
                }
                return ret;
            }
        case 'quote':
            return expr[1];
        case '=':
            {
                var eq=(evalScheem(expr[1],env)===evalScheem(expr[2],env));
                if(eq)
                {
                    return '#t';
                }
                else return '#f';
            }
         case '<':
            {
                var eq=(evalScheem(expr[1],env)<evalScheem(expr[2],env));
                if(eq)
                {
                    return '#t';
                }
                else return '#f';
            }
        case 'cons':{
            var list=[expr[1]];
            list=list.concat(expr[2]);
            return list;}
        case 'car':
            return expr[1][0];
        case 'cdr':
            var list=expr[1];
            list.splice(0,1);
            return list;
        case 'if':
            var eq=evalScheem(expr[1],env);
            if(eq=='#t')
            {
                return evalScheem(expr[2],env);
            }
            else
                return evalScheem(expr[3],env);
                                    
    }
};

/*function check()
{
    return evalScheem(['cons',3,3]);
}
console.log(check());*/ 
if (typeof module !== 'undefined') {
    module.exports.evalScheem = evalScheem;
}
