namespace Orikivo.Web
{
    export class Command
    {
        public name: string;
        public summary: string;
        public aliases: Array<string>;
        public args: Arg[];


        // to-do: Add overload support
        constructor(name: string, summary: string, aliases: Array<string> = null, args: Array<Arg> = null)
        {
            this.name = name;
            this.summary = summary;
            this.aliases = aliases;
            this.args = args;
        }

        read()
        {
            return createDiv(null, "module-command", this.name);
        }

        // build() = read the entire set information dedicated to an argument
        // list() = read the arg as a block info.

        build()
        {
            var _border = createDiv(null, "command-info-border");
            var _div = createDiv(null, "command-info");
            var commandSyntax = createDiv(null, "command-syntax");
        
            var commandName = createSpan("command-name");
            commandName.innerHTML = HtmlFormat.Bold(this.name);
        
            var commandParameterData = createDiv(null, "command-param-data");
        
            if (this.args != null)
            {
                var commandParameters = document.createElement("span");
                commandParameters.className = "command-parameters";
            
                var argOpener = document.createElement("span");
                argOpener.innerText = "(";
            
                var argCloser = document.createElement("span");
                argCloser.innerText = ")";
            
                commandParameters.appendChild(argOpener);
            
                this.args.forEach(function(arg)
                {
                    var argInfo = arg.build();
                    var argParam = arg.list();
                    argParam.onclick = function() { toggleElement(argInfo); };
                
                    commandParameterData.appendChild(argInfo);
                    commandParameters.appendChild(argParam);
                });
            
                commandParameters.appendChild(argCloser);
                commandSyntax.appendChild(commandParameterData);
                commandSyntax.appendChild(commandName);
                commandSyntax.appendChild(commandParameters);
            }
            else
            {
                commandName.innerHTML += `()`;
                commandSyntax.appendChild(commandName);
            }
        
        
            var commandSummary = createDiv(null, "command-summary", this.summary);
        
            _div.appendChild(commandSyntax);
        
            if (this.aliases != null)
            {
                var commandAliases = createDiv(null, "command-aliases", `--${this.aliases.toString()}`);
                _div.appendChild(commandAliases);
            }
        
            _div.appendChild(commandSummary);
        
            _border.appendChild(_div);
            return _border;
        }
    }
}