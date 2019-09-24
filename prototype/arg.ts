namespace Orikivo.Web
{
    export class Arg
    {
        public name: string;
        public summary: string;
        public type: string;
        public optional: boolean;

        constructor(name: string, type: string, summary: string = null, optional: boolean = false)
        {
            this.name = name;
            this.summary = summary;
            this.type = type;
            this.optional = optional;
        }

        build()
        {
            var argInfo = document.createElement("div");
            argInfo.className = "parameter-info";
        
            var argName = document.createElement("div");
            argName.className = "parameter-name";
            argName.innerText = this.read();

            var argType = document.createElement("div");
            argType.className = "parameter-type";
            argType.innerText = this.type;
        
            var argTypeBubble = document.createElement("span");
            argTypeBubble.className = "parameter-type-bubble";
        
            // use this upon the bubble being clicked
            //https://docs.microsoft.com/en-us/dotnet/api/system.string
        
            argInfo.appendChild(argName);
            argInfo.appendChild(argTypeBubble);
            argInfo.appendChild(argType);

            if (this.summary != null)
            {
                var argSummary = document.createElement("div");
                argSummary.className = "parameter-summary";
                argSummary.innerText = this.summary;
            
                argInfo.appendChild(argSummary);
            }
        
            return argInfo;
        }

        list()
        {
            var parameterInfo = document.createElement("span");
            parameterInfo.className = "command-parameter";
            parameterInfo.innerText = this.read();
            return parameterInfo;
        }

        read()
        {
            var full = this.name;
            if (this.optional)
            {
                full += "?";
            }
            return full;
        }
    }
}