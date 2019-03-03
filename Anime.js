let numberOfAnimes = 0;	// Total number of animes

const animeList = [];	// List of animes
const log = console.log

class Review{
	constructor(reviewer, review, grade){
		this.reviewer = reviewer;
		this.review = review;
		this.grade = grade;
	}
}

class Reviews{
	constructor(){
		this.reviewList = []; // List of reviews
		this.numberOfReviews = 0;
	}
	addReview(review){
		this.reviewList.push(review);
		this.numberOfReviews++;
	}
	calculateAverageScore(){
		//log(this.reviewList);
		if(this.numberOfReviews == 0){
			return "N/A";
		}
		let ret = 0;
		for(let i = 0; i < this.numberOfReviews; i++){
			ret += parseInt(this.reviewList[i].grade);
		}
		return ret/this.numberOfReviews;
	}
}


class Anime{
	constructor(title, description, image){
		this.title = title;
		this.description = description;
		this.image = image;
		this.reviews = new Reviews();
		this.averageScore = this.reviews.calculateAverageScore();
		numberOfAnimes++;
	}

	createReview(review){
		this.reviews.addReview(review);
		this.averageScore = this.reviews.calculateAverageScore();
	}
}

let currentAnime = "";

animeList.push(new Anime("Hunter X Hunter", "The story focuses on a young boy named Gon Freecss, who discovers that his father, who he was told had left him at a young age, is actually a world renowned Hunter, a licensed profession for those who specialize in, but are not limited to fantastic pursuits such as locating rare or unidentified animal species, treasure hunting, surveying unexplored enclaves, or hunting down lawless individuals. In short, being a hunter is roughly the same as being a professional at a certain profession while being able to utilize the power system within the anime called Nen. Despite being abandoned by his father, Gon departs upon a journey to follow in his footsteps, pass the rigorous Hunter Examination, and eventually find his father. Along the way, Gon meets various other Hunters, including main cast members Kurapika, Leorio, and Killua, and also encounters the paranormal. ", "hunter.jpg"));
animeList.push(new Anime("Kimi No Na Wa", "Mitsuha and Taki are complete strangers living separate lives until they suddenly switch places. Mitsuha wakes up in Taki's body, and he in hers. This occurrence happens randomly, and they must adjust their lives around each other. Yet, somehow, it works. They build a connection by leaving notes for one another until they wish to finally meet. But something stronger than distance may keep them apart.", null));

animeList[0].createReview(new Review("Gon", "The best anime I've ever seen! Recommend to everybody!!!!", 10));
animeList[0].createReview(new Review("Killua", "MASTERPIECE!", 10));
animeList[1].createReview(new Review("Mitsuha", "Very good movie, made me cry of how good it was.", 10));

function submitReview(){
	let username = document.getElementById("usernameR").value;
	let review = document.getElementById("newReviewR").value;
	let grade = document.getElementById("newGradeR").value;
	if(username == "" || review == "" || grade == ""){
		alert("Please fill all required information.");
		return
	}
	// Check if username is valid, if grade is valid

	for(let i=0; i<numberOfAnimes; i++){
		if(animeList[i].title == currentAnime){
			animeList[i].createReview(new Review(username, review, grade));
		}
	}

	document.getElementById("usernameR").value = "";
	document.getElementById("newReviewR").value = "";
	document.getElementById("newGradeR").value = "";
	load(currentAnime);
	alert("Thank you for your review.")

}

function load(title){
	currentAnime = title;
	var elem = document.getElementById("Anime");
	elem.parentNode.removeChild(elem);
	const anime = document.createElement("div");
	anime.setAttribute("id", "Anime");
	document.body.appendChild(anime);
	for(let i=0; i<numberOfAnimes; i++){
		if(animeList[i].title == title){
			const title = document.createElement("div");
			const titleText = document.createTextNode(animeList[i].title);
			title.className = "animeTitle";
			title.appendChild(titleText);
			document.getElementById("Anime").appendChild(title);
			
			const description = document.createElement("div");
			const descriptionText = document.createTextNode(animeList[i].description);
			description.appendChild(descriptionText);
			description.className = "animeDescription";
			document.getElementById("Anime").appendChild(description);

			const grade = document.createElement("div");
			const gradeText = document.createTextNode(animeList[i].averageScore);
			grade.className = "animeGrade";
			grade.appendChild(gradeText);
			document.getElementById("Anime").appendChild(grade);

			const image = document.createElement("img");
			image.setAttribute("src", animeList[i].image);
			image.className = "animeImage";
			document.getElementById("Anime").appendChild(image);


			const newReport = document.createElement("table");
			newReport.className = "newReport";
			let newRow = newReport.insertRow(0);
			let username = newRow.insertCell(0);
			let newReview = newRow.insertCell(1);
			let newGrade = newRow.insertCell(2);
			let submit = newRow.insertCell(3);

			const usernameT = document.createElement("textarea");
			usernameT.setAttribute("id", "usernameR");
			usernameT.setAttribute("rows", 1);
			usernameT.setAttribute("cols", 15);
			const usernameText = document.createTextNode("Username: ");
			username.appendChild(usernameText);
			username.appendChild(usernameT);

			const newReviewT = document.createElement("textarea");
			newReviewT.setAttribute("id", "newReviewR");
			newReviewT.setAttribute("rows", 4);
			newReviewT.setAttribute("cols", 80);
			const newReviewText = document.createTextNode("Review: ");
			newReview.appendChild(newReviewText);
			newReview.appendChild(newReviewT);

			const newGradeT = document.createElement("textarea");
			newGradeT.setAttribute("id", "newGradeR");
			newGradeT.setAttribute("rows", 1);
			newGradeT.setAttribute("cols", 2);
			const newGradeText1 = document.createTextNode("Grade: ");
			const newGradeText2 = document.createTextNode(" /10");
			newGrade.appendChild(newGradeText1);
			newGrade.appendChild(newGradeT);
			newGrade.appendChild(newGradeText2);

			const submitT = document.createElement("button");
			submitT.className = "submitButton"
			submitT.setAttribute("onclick", "submitReview()");
			const submitText = document.createTextNode("Submit this review");
			submitT.appendChild(submitText);
			submit.appendChild(submitT);

			document.getElementById("Anime").appendChild(newReport);

			const table = document.createElement("table");
			table.className = "animeReviews";
			for(let j=0; j<animeList[i].reviews.numberOfReviews; j++){
				let row = table.insertRow(0);
				let reviewerName = row.insertCell(0);
				let review = row.insertCell(1);
				let reviewGrade = row.insertCell(2);
				let report = row.insertCell(3);
				reviewerName.innerHTML = "Username: " + animeList[i].reviews.reviewList[j].reviewer;
				review.innerHTML = "Review: " + animeList[i].reviews.reviewList[j].review;
				reviewGrade.innerHTML = "Grade: " + animeList[i].reviews.reviewList[j].grade + "/10";
				const reportButton = document.createElement("button");
				const reportText = document.createTextNode("Report this review");
				reportButton.appendChild(reportText);
				reportButton.className = "reviewReport";
				// ADD BUTTON ACTION HERE
				report.appendChild(reportButton);
			}
			document.getElementById("Anime").appendChild(table);
			return;
		}
	}


}

load("Hunter X Hunter");


