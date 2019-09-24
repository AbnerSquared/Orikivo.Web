namespace Orikivo.Web
{
    export class Module
    {
        public name: string;
        public flavorText: string;
        public summary: string;
        public submodules: Module[];
        public commands: Command[];

        constructor(name, flavorText, summary, commands, submodules = null)
        {
            this.name = name; // name of module.
            this.flavorText = flavorText;
            this.summary = summary;
            this.submodules = submodules;
            this.commands = commands;
            // submodules
        }


        build()
        {
            var _div = createDiv(null, "module");
            var pointer = createDiv(this.name, "module-pointer"); // this is what scrolls into view.
        
            var moduleInfo = createDiv(null, "module-info");
        
            var moduleCommands = createDiv(`${this.name}-commands-list`, "module-commands");
            var moduleData = createDiv(null, "module-data");
        
            var moduleHeader = createDiv(null, "module-header");
            moduleHeader.appendChild(createDiv("title", null, this.name));
            moduleHeader.appendChild(createDiv("flair", null, this.name));
            moduleHeader.onclick = function() { toggleElement(moduleCommands); };
        
            var moduleSummary = createDiv(null, "module-summary");
            moduleSummary.innerText = this.summary;
        
            moduleInfo.appendChild(moduleHeader);
        
            var _module = this;
            this.commands.forEach(function(command)
            {
                var commandInfo = command.build();
                commandInfo.id = `${_module.name}-${command.name}`;
                var commandBox = command.read();
                commandBox.onclick = function() { scrollToElement(commandInfo.id); }; 
            
                moduleCommands.appendChild(commandBox);
                moduleData.appendChild(commandInfo);
            });
        
            moduleInfo.appendChild(moduleCommands);
            moduleInfo.appendChild(moduleSummary);
        
            _div.appendChild(pointer);
            _div.appendChild(moduleInfo);
            _div.appendChild(moduleData);
        
            return _div;
        }
    }
}