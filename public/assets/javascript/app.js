var buildArticleCard = (article) =>{
    console.log("IN buildArticleCard");
    var card = 
     $("<div>").addClass("card savedArticleCard")
        .append
        (
            $("<div>").addClass("card-header").append(
                $("<a>").attr("href",article.link).attr("target","_blank").append(
                    $("<h2>").text(article.title)
                )
            )
        )
        .append
        (
            $("<div>").addClass("card-block").append(
                $("<p>").text(article.description)
            )
        )
        .append
        (
            $("<button>").addClass("btn btn-primary").attr("id","btnArticleNotes").attr("data-id",article._id).text("Article Notes")
            .click(function()
            {

            })
        )
        .append(
            $("<button>").addClass("btn btn-danger").attr("id","btnDeleteArticle").attr("data-id",article._id).text("Delete From Saved")
        );
        return card;
}

$(function(){

    $(document).ready(function() {
        $.ajax("/getArticles",{
            type:"GET"
        }).then(function(results) {

            var articles = results.articles;
            console.log("App.articles in ReadyFunction:");
            console.log(articles);
            console.log();
            // $("#articleBlock").empty();

            if(articles.length > 0)
            {
                for(var i = 0; i < articles.length; i++)
                {
                    
                    $("#articleBlock").append(buildArticleCard(articles[i]));
                    
                    //                     <div class="card">
                    //     <div class="card-header">
                    //         <a href={{link}}><h2>{{title}}</h2></a>
                    //     </div>
                    //     <div class="card-block">
                    //     </div>
                    //     <button class="btn btn-primary" id="btnArticleNotes" data-id={{_id}}>Article Notes</button>
                    //     <button class="btn btn-danger" id="btnDeleteArticle" data-id={{_id}}>Delete From Saved</button>
                    // </div>
                }
                
            }
            else
            {

                var emptyCard = $("<div>").addClass("card empty-article").append(
                    $("<div>").addClass("card-header")
                    .append(
                        $("<h2>").text("Uh oh. Looks like we don't have any new articles.")
                    )
                );

                $("#articleBlock").append(emptyCard);
                // <div class="card text-center" style="">
                //     <div class="card-header">
                //         <h2 style="color:white;">Uh oh. Looks like we don't have any new articles.</h2>
                //     </div>
                // </div>
            }
        });
    });


    $("#scrape-btn").on("click",function(){
        console.log("Scrape button CLICKED");
        $.ajax("/scrape",{
            type:"GET"
        }).done(function(results){
            console.log("Scrape COMPLETE");
            $("#articleBlock").empty();

            $("#scrapeModalHeader").text("Added " + results.articles.length + " new articles!");
            $("#scrapeModal").modal();

            var articles = results.articles;
            console.log("Articles " + articles);

            for(var i =0; i < articles.length; i++){
                console.log();
                console.log("Title: " + articles[i].title);
                console.log("Link: " + articles[i].link);
                console.log("Description: " + articles[i].description);


                var card = $("<div>").addClass("card newArticle").attr("data-id",i);                
                var cardHeader = $("<div>").addClass("card-header");
                var link = $("<a>").attr("href",articles[i].link).attr("target","_blank");
                var title = $("<h3>").text(articles[i].title);                
                $(link).append(title);
                var saveButton = $("<button>").addClass("btn-success btnSaveArticle").attr("data-id",i).text("Save Article")
                .click(function(){  
                    
                    var article = {};
                    article.title = $(this).parent().children("a").children("h3").text();
                    article.description = $(this).parent().parent().children(".card-block").children("p").text();
                    article.link = $(this).parent().children("a").attr("href");
                

                    // console.log("Article to Submit: ");
                    // console.log("   Title: " + article.title);
                    // console.log("   link: " + article.link);
                    // console.log("   description: " + article.description);

                    $.ajax({
                        method: "POST",
                        url: "/article",
                        data:article
                    })
                    .done(function(){
                        console.log("article saved");
                        
                    })
                    $(this).parent().parent().remove();
                });
                
                $(cardHeader).append(link).append(saveButton);
                var cardblock = $("<div>").addClass("card-block");
                var description = $("<p>").text(articles[i].description);
                $(cardblock).append(description);
                $(card).append(cardHeader).append(cardblock);

                $("#articleBlock").append(card);
            }
            
        //     <div class="card-header">
        //     <h3 class="articleTitle">{{title}}</h3>
        //     <button class="btn-success btnSaveArticle" data-id={{id}}>Save Article</button>
        // </div>
        // <div class="card-block">
        //     <p class="description">{{description}}</p>
        // </div>


        });
    });

    // $(".btnSaveArticle").on("click", function(){
     

        
    // });


});