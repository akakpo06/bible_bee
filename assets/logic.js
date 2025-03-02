
    let questions = [];
    let currentIndex = 0;
    let timerInterval;
    let currentCategory = "";
    let categoryQuestions = [];

    // Charger les questions depuis le fichier JSON
    async function fetchQuestions() {
        try {
            const response = await fetch('questions.json');
            data = await response.json();
            console.log(data)
            groupByCategory();
            nextQuestion();
        } catch (error) {
            console.error("Erreur de chargement des questions :", error);
        }
    }

    // Grouper les questions par catégorie
    function groupByCategory() {
        const categories = {};
        
        // Organiser les questions par catégorie
        data.forEach(questionCategory => {

            if (!categories[questionCategory.category]) {
                categories[questionCategory.category] = [];
            }
            categories[questionCategory.category].push(questionCategory.questions);
        });

        // Trier les catégories par ordre d'apparition
        // const categoryKeys = Object.keys(categories);

        // Préparer l'affichage catégorie par catégorie
        // categoryQuestions = categoryKeys.flatMap(category => categories[category].slice(0, 15));
        categoryQuestions = categories
        // console.log(categoryQuestions)
    }

    // Afficher la prochaine question
    function nextQuestion() {
        if (timerInterval) clearInterval(timerInterval); // Arrêter le minuteur précédent

        if (currentIndex >= categoryQuestions.length) {
            alert("Fin du jeu");
            currentIndex = 0; // Réinitialiser si nécessaire
            return;
        }

        const question = categoryQuestions[currentIndex];
        currentCategory = categoryQuestions.category;
console.log(categoryQuestions)
        document.getElementById('category').textContent = `📚 Catégorie : ${data.currentIndex}`;
        document.getElementById('question-fr').textContent = `🇫🇷 ${question.question.fr}`;
        document.getElementById('question-en').textContent = `🇬🇧 ${question.question.en}`;

        startTimer(question.time);
        currentIndex++;
    }

    // Lancer le minuteur
    function startTimer(duration) {
        let timeLeft = duration;
        const timeDisplay = document.getElementById('time-left');
        timeDisplay.textContent = timeLeft;

        timerInterval = setInterval(() => {
            timeLeft--;
            timeDisplay.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                alert("⏳ Temps écoulé !");
            }
        }, 1000);
    }

    window.onload = fetchQuestions;

