from llamaapi import LlamaAPI
import json
llama = LlamaAPI('LL-V90ms4rkesFeeZn8rZesf4wpZSpoFBJPwVJu8m1apy2uiJvXRnB8ZLinCPUIpykt')

api_request_json = {
    "model": "llama-13b",
    "messages": [
        {"role": "user", "content": "samsung s24 ultra ai camera"}
    ],
    "functions": [
        {
            "name": "get_headings",
            "description": "Generate 10 headlines for the given topic",
            "parameters": {
                "type": "object",
                "properties": {
                    "topic": {
                        "type": "string",
                        "description": "The topic to generate headlines for"
                    }
                },
                "required": ["topic"]
            }
        }
    ],
    "stream": False,
    "function_call": {"name": "get_headings", "arguments": {"topic": "samsung s24 ultra ai camera"}}
}

# Make your request and handle the response
try:
    response = llama.run(api_request_json)
    print(json.dumps(response.json(), indent=2))
except Exception as e:
    print(f"An error occurred: {e}")
