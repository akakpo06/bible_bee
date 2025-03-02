    // Charger les questions depuis le fichier JSON
async function fetchQuestions() {
        try {
            const response = await fetch('./assets/data.json');
            let data = await response.json();
            console.log(data)
            return data;
        } catch (error) {
            console.error("Erreur de chargement des questions :", error);
        }
    }

document.addEventListener("DOMContentLoaded", async function () {
    let currentIndex = 0;
    const data = await fetchQuestions();
    const category = document.getElementById("category").getAttribute("data");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    let frenchquestion = document.getElementById("question_fr")
    let englishquestion = document.getElementById("question_eng")

    

    if (category === "complete") {
        questions = data[1].questions
    }
    else if (category === "eclairs") {
        questions = data[0].questions
    }
    else{
        alert("erreur de chargement des questions")
    }

    const totalQuestions = questions.length;

    console.log(questions)

    function showQuestion(index) {
        
            frenchquestion.textContent = questions[index].fr
            englishquestion.textContent = questions[index].en
    }

    prevBtn.addEventListener("click", function () {
        currentIndex = (currentIndex - 1 + totalQuestions) % totalQuestions;
        showQuestion(currentIndex);
    });

    nextBtn.addEventListener("click", function () {
        currentIndex = (currentIndex + 1) % totalQuestions;
        showQuestion(currentIndex);
    });

    showQuestion(currentIndex);
});