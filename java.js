if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
  
    recognition.lang = 'en-GB'; 
    recognition.interimResults = false; 
    recognition.continuous = false; 
  
    function speak(text) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-GB';
      synth.speak(utterance);
    }




    
    function handleCommand(command) {
      const lowerCommand = command.toLowerCase();
      if (lowerCommand.includes("weather in")) {
        // Extract city name from the user's query
        // const cityMatch = lowerCommand.match(/weather in ([a-z\s]+)/);
        const city = lowerCommand.replace("weather in", "").trim();
        if (city) {
          // const city = cityMatch[1].trim();
          // const city = lowerCommand.replace("weather in", "").trim();
          // Fetch weather for the extracted city
          fetch(`https://goweather.herokuapp.com/weather/${city}`)
            .then((response) => response.json())
            .then((data) => {
              const temperature = data.temperature || "N/A";
              const description = data.description || "No description available";

              // Update the webpage with the weather details
              document.getElementById("city-name").textContent = city;
              document.getElementById("temperature").textContent = temperature;
              document.getElementById("description").textContent = description;

              // Speak the weather details
              speak(`The weather in ${city} is currently ${temperature} with ${description}.`);
            })
            .catch((error) => {
              console.error("Error fetching weather data:", error);
              document.getElementById("city-name").textContent = city;
              document.getElementById("temperature").textContent = "Error fetching data";
              document.getElementById("description").textContent = "-";
              speak("Sorry, I couldn't fetch the weather data for the specified city.");
            });
        } else {
          speak("Please specify a city name after saying weather.");
        }
      } 
      else if (lowerCommand.includes('time')) {
        const time = new Date().toLocaleTimeString();
        speak(`The current time is ${time}`);
      } else if (lowerCommand.includes('date')) {
        const date = new Date().toLocaleDateString();
        speak(`Today's date is ${date}`);
      } else if (lowerCommand.includes("open youtube")) {
        speak("Opening YouTube");
        window.open("https://youtube.com", "_blank");
      }else if (lowerCommand.startsWith("play")) {
            const searchQuery = lowerCommand.replace("play", "").trim();
            if (searchQuery) {
                speak(`Playing ${searchQuery} on YouTube`);
                const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
                window.open(youtubeUrl, "_blank");
            } else {
                speak("Please specify what you want me to play on YouTube.");
            }
      } else if (lowerCommand.includes("open spotify")) {
        speak("Opening Spotify");
        window.open("https://spotify.com", "_blank");
      } else if (lowerCommand.includes("open google")) {
        speak("Opening Google");
        window.open("https://google.com", "_blank");
      }
      else if (lowerCommand.startsWith("search for") ) {
        // Extract the search query from the command
        const searchQuery = lowerCommand.replace("search for", "").replace("google", "").trim();
        if (searchQuery) {
            speak(`Searching Google for ${searchQuery}.`);
            const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
            window.open(googleUrl, "_blank"); // Open the search results in a new tab
        } else {
            speak("Please specify what you want me to search for on Google.");
        }
    }
    
      else if (lowerCommand.includes("hello")) {
        speak("Hello boss! Iam Viora.How can I help you Today.");
      }else if (lowerCommand.includes("thankyou")) {
            speak("Welcome! Have goodday Boss.");
      }
      
      
       else if (lowerCommand.includes("open best college")) {
            speak("Opening s r i t w college website.");
            window.open("https://sritw.org/", "_blank"); // Replace with the actual college website URL
          } else if (lowerCommand.includes("show college placements")) {
            speak("Opening the placements section of S R I T W.");
            window.open("https://sritw.org/placements2?id=placement1", "_blank");
          } else if (lowerCommand.includes("show hostel details")) {
            speak("Opening the hostel facilities section of S R I T W.");
            window.open("https://sritw.org/hostel", "_blank");
          } else if (lowerCommand.includes("about college") || lowerCommand.includes("show sritw programs")) {
            speak("Opening the programs offered by S R I T W.");
            window.open("https://sritw.org/about", "_blank");
          }
          else if(lowerCommand.includes("pomodoro")){
              speak("opening pomodoro timer for 25 minutes");
              window.open("pomo.html", "_blank");
          }
          else if(lowerCommand.includes("games")){
            speak("Opening games for relaxation");
            window.open("https://www.yapigames.com/en/games/p/creative-puzzle", "_blank");
          }
        else {
        speak('Sorry, I did not understand that command.');
      } 
    }
  
    function startListening() {
      recognition.start();
  
      recognition.onstart = () => {
        console.log('Voice recognition started. Speak into the microphone.');
      };
  
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log('You said:', transcript);
        handleCommand(transcript);
      };
  
      recognition.onerror = (event) => {
        console.error('Error occurred in recognition:', event.error);
        speak('Sorry, I could not hear you. Please try again.');
      };
  
      recognition.onend = () => {
        console.log('Voice recognition ended.');
        // Uncomment the next line if you want continuous listening
        // startListening();
      };
    }
  
    document.getElementById('start-btn').addEventListener('click', () => {
      startListening();
    });
  } else {
    console.error('Web Speech API is not supported in this browser.');
    alert('Sorry, your browser does not support the Web Speech API.');
  }
  