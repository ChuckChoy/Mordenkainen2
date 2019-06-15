//character creation carousel. added pause because id don't want and auto-sliding carousel
$("#carouselExampleControls").carousel();

//posts login info
// subverts submit button for ajax request.
$(function () {
    $("#log").submit(function (e) {
        e.preventDefault();  //prevent normal form submission

        var actionUrl = $(this).attr("Login");  // get the form action value
        $.post(actionUrl, $(this).serialize(), function (res) {
            //res is the response coming from our ajax call. Use this to update DOM
            $("#viewB").html(res);
        });
    });

});
//posts registration info
$(function () {
    $("#reg").submit(function (e) {
        e.preventDefault();  //prevent normal form submission

        var actionUrl = $(this).attr("Register");  // get the form action value
        $.post(actionUrl, $(this).serialize(), function (res) {
            //res is the response coming from our ajax call. Use this to update DOM
            $("#viewB").html(res);
        });
    });
});

//Create Character Sheet. Fires when you hit the save button during character creation
$(function () {
    $("#sheetform").submit(function (e) {
        e.preventDefault();  //prevent normal form submission
        var actionUrl = $(this).attr("CreateCharacter");  // get the form action value
        $.post(actionUrl, $(this).serialize(), function (res) {
            //res is the response coming from our ajax call. Use this to update DOM
            $("#viewB").html(res);
        });
    });
});

//save character with the save button at top of page.
$("#saveCharacter").on("click",function () {   
    var actionUrl = $(this).attr("CreateCharacter");  // get the form action value
    //get current contents of the form
    $("#sheetform").submit(function () {
        //prevent actual submit
        e.preventDefault();
        //send serialized object via ajax post to server
        $.post(actionUrl, $(this).serialize(), function (res) {
            //res is the response coming from our ajax call. Use this to update DOM
            $("#viewB").html(res);
        });
    });
   
});


//on load retreive character selection
$(function () {
    var actionUrl = "GetCharacterSelection";
    $.get(actionUrl, function (res) {
        //res is the response coming from our ajax call. Use this to update DOM
        //put the reteived selections into a select statement
        if (res === undefined) {
            return false;
        }
        //clear select element of inputs
        $("#characterSelect").html("");
        $("#characterSelect").append($("<option></option>").attr("value", null).text("Select a Character"));
        for (var item in res) {          
            //var resObject = JSON.parse(res);
            //get values from response object
            var key = res[0]["characterID"];
            var value = res[0]["characterName"];
            //dynamically add characters to the select element
            $("#characterSelect").append($("<option></option>").attr("value", key).text(value));
                //.attr("text",value));
        }
    });
});

//get alignment selection for character creation
$(function () {
    var actionUrl = "GetAlignmentSelection";
    $.get(actionUrl, function (res) {
        //res is the response coming from our ajax call. Use this to update DOM
        //put the reteived selections into a select statement
        if (res === undefined) {
            return false;
        }
        //clear select element of inputs
        $("#CharacterSheet_AlignmentID").html("");
        $("#CharacterSheet_AlignmentID").append($("<option></option>").attr("value", null).text("Select an alignment"));
        for (var item in res) {
            //var resObject = JSON.parse(res);
            //get values from response object
            var key = res[0]["AlignmentID"];
            var value = res[0]["AlignmentType"];
            //dynamically add characters to the select element
            $("#CharacterSheet_AlignmentID").append($("<option></option>").attr("value", key).text(value));
            //.attr("text",value));
        }
    });
});
//get alignment selection for character creation
$(function () {
    var actionUrl = "GetBackgroundSelection";
    $.get(actionUrl, function (res) {
        //res is the response coming from our ajax call. Use this to update DOM
        //put the reteived selections into a select statement
        if (res === undefined) {
            return false;
        }
        //clear select element of inputs
        $("#CharacterSheet_BackgroundID").html("");
        $("#CharacterSheet_BackgroundID").append($("<option></option>").attr("value", null).text("Select an alignment"));
        for (var item in res) {
            //var resObject = JSON.parse(res);
            //get values from response object
            var key = res[0]["BackgroundID"];
            var value = res[0]["BackgroundName"];
            //dynamically add characters to the select element
            $("#CharacterSheet_BackgroundID").append($("<option></option>").attr("value", key).text(value));
            //.attr("text",value));
        }
    });
});


//get the character from the database.
$("#characterSelect").change(function (e) {
    //controller action
    var actionUrl = "GetSelectedCharacter";
    //get value of dropdown box    
    var data = e.target.value;
    // post the character selection to server
    $.ajax({
        type: "POST",
        url: actionUrl,
        data: { charID: data },
        success: function (data) {
            var res = JSON.parse(data);
            $("#CharacterSheet_CharacterName").val(res["CharacterSheet"]["CharacterName"]);
            $("#CharacterSheet_Class").val(res["CharacterSheet"]["Class"]);
            $("#CharacterSheet_CharLevel").val(res["CharacterSheet"]["CharLevel"]);
            $("#CharacterSheet_Race").val(res["CharacterSheet"]["Race"]);
            $("#CharacterSheet_Background").val(res["CharacterSheet"]["Background"]["BackgroundName"]);
            $("#CharacterSheet_Alignment").val(res["CharacterSheet"]["Alignment"]["AlignmentType"]);
            $("#CharacterSheet_PlayerName").val(res["CharacterSheet"]["PlayerName"]);
            $("#CharacterSheet_Experience").val(res["CharacterSheet"]["Experience"]);

            $("#CharacterSheet_Strength").val(res["CharacterSheet"]["Strength"]).change();
            $("#CharacterSheet_Dexterity").val(res["CharacterSheet"]["Dexterity"]).change();
            $("#CharacterSheet_Constitution").val(res["CharacterSheet"]["Constitution"]).change();
            $("#CharacterSheet_Intelligence").val(res["CharacterSheet"]["Intelligence"]).change();
            $("#CharacterSheet_Wisdom").val(res["CharacterSheet"]["Wisdom"]).change();
            $("#CharacterSheet_Charisma").val(res["CharacterSheet"]["Charisma"]).change();
            $("#CharacterSheet_Inspiration").val(res["CharacterSheet"]["Inspiration"]);
            $("#CharacterSheet_ProficiencyBonus").val(res["CharacterSheet"]["ProficiencyBonus"]);

            $("#SavingThrows_StrSaveProf").attr("checked",res["SavingThrows"]["StrSaveProf"]);
            $("#SavingThrows_StrSave").val(res["SavingThrows"]["StrSave"]);
            $("#SavingThrows_DexSaveProf").attr("checked",res["SavingThrows"]["DexSaveProf"]);
            $("#SavingThrows_DexSave").val(res["SavingThrows"]["DexSave"]);
            $("#SavingThrows_ConSaveProf").attr("checked",res["SavingThrows"]["ConSaveProf"]);
            $("#SavingThrows_ConSave").val(res["SavingThrows"]["ConSave"]);
            $("#SavingThrows_IntSaveProf").attr("checked",res["SavingThrows"]["IntSaveProf"]);
            $("#SavingThrows_IntSave").val(res["SavingThrows"]["IntSave"]);
            $("#SavingThrows_WisSaveProf").attr("checked",res["SavingThrows"]["WisSaveProf"]);
            $("#SavingThrows_WisSave").val(res["SavingThrows"]["WisSave"]);
            $("#SavingThrows_CharSaveProf").attr("checked",res["SavingThrows"]["ChaSaveProf"]);
            $("#SavingThrows_ChaSave").val(res["SavingThrows"]["ChaSave"]);

            $("#Skills_Acrobatics_T").attr("checked",res["Skills"]["Acrobatics_T"]);
            $("#Skills_Acrobatics").val(res["Skills"]["Acrobatics"]);
            $("#Skills_AnimalHandling_T").attr("checked", res["Skills"]["AnimalHandling_T"]);
            $("#Skills_AnimalHandling").val(res["Skills"]["AnimalHandling"]);
            $("#Skills_Arcana_T").attr("checked", res["Skills"]["Arcana_T"]);
            $("#Skills_Arcana").val(res["Skills"]["Arcana"]);
            $("#Skills_Athletics_T").attr("checked", res["Skills"]["Athletics_T"]);
            $("#Skills_Athletics").val(res["Skills"]["Athletics"]);
            $("#Skills_Deception_T").attr("checked", res["Skills"]["Deception_T"]);
            $("#Skills_Deception").val(res["Skills"]["Deception"]);
            $("#Skills_History_T").attr("checked", res["Skills"]["History_T"]);
            $("#Skills_History").val(res["Skills"]["History"]);
            $("#Skills_Insight_T").attr("checked", res["Skills"]["Insight_T"]);
            $("#Skills_Insight").val(res["Skills"]["Insight"]);
            $("#Skills_Intimidation_T").attr("checked", res["Skills"]["Intimidation_T"]);
            $("#Skills_Intimidation").val(res["Skills"]["Intimidation"]);
            $("#Skills_Investigation_T").attr("checked", res["Skills"]["Investigation_T"]);
            $("#Skills_Investigation").val(res["Skills"]["Investigation"]);
            $("#Skills_Medicine_T").attr("checked", res["Skills"]["Medicine_T"]);
            $("#Skills_Medicine").val(res["Skills"]["Medicine"]);
            $("#Skills_Nature_T").attr("checked", res["Skills"]["Nature_T"]);
            $("#Skills_Nature").val(res["Skills"]["Nature"]);
            $("#Skills_Perception_T").attr("checked", res["Skills"]["Perception_T"]);
            $("#Skills_Perception").val(res["Skills"]["Perception"]);
            $("#Skills_Performance_T").attr("checked", res["Skills"]["Performance_T"]);
            $("#Skills_Performance").val(res["Skills"]["Performance"]);
            $("#Skills_Persuasion_T").attr("checked", res["Skills"]["Persuasion_T"]);
            $("#Skills_Persuasion").val(res["Skills"]["Persuasion"]);
            $("#Skills_Religion_T").attr("checked", res["Skills"]["Religion_T"]);
            $("#Skills_Religion").val(res["Skills"]["Religion"]);
            $("#Skills_Sleight_T").attr("checked", res["Skills"]["Sleight_T"]);
            $("#Skills_Sleight").val(res["Skills"]["Sleight"]);
            $("#Skills_Stealth_T").attr("checked", res["Skills"]["Stealth_T"]);
            $("#Skills_Stealth").val(res["Skills"]["Stealth"]);
            $("#Skills_Survival_T").attr("checked", res["Skills"]["Survival_T"]);
            $("#Skills_Survival").val(res["Skills"]["Survival"]);

            $("#CharacterSheet_PassiveWisdom").val(res["CharacterSheet"]["PassiveWisdom"]);
            $("#Proficiencies_Armor").val(res["Proficiencies"]["Armor"]);
            $("#Proficiencies_Weapons").val(res["Proficiencies"]["Weapons"]);
            $("#Proficiencies_Tools").val(res["Proficiencies"]["Tools"]);
            $("#Proficiencies_Languages").val(res["Proficiencies"]["Languages"]);

            $("#CharacterSheet_ArmorClass").val(res["CharacterSheet"]["ArmorClass"]);
            $("#CharacterSheet_Initiative").val(res["CharacterSheet"]["Initiative"]);
            $("#CharacterSheet_Speed").val(res["CharacterSheet"]["Speed"]);
            $("#CharacterSheet_MaxHP").val(res["CharacterSheet"]["MaxHP"]);
            $("#CharacterSheet_HitPoints").val(res["CharacterSheet"]["HitPoints"]);
            $("#CharacterSheet_TemporaryHP").val(res["CharacterSheet"]["TemporaryHP"]);
            $("#CharacterSheet_HitDie").val(res["CharacterSheet"]["HitDie"]);
            $("#CharacterSheet_HitDieType").val(res["CharacterSheet"]["HitDieType"]);
            $("#CharacterSheet_DeathSaveSuccess").val(res["CharacterSheet"]["DeathSaveSuccess"]);
            $("#CharacterSheet_DeathSaveFailure").val(res["CharacterSheet"]["DeathSaveFailure"]);

            $("#CharacterSheet_Attacks").val(res["CharacterSheet"]["Attacks"]);

            $("#Money_Copper").val(res["Money"]["Copper"]);
            $("#Money_Silver").val(res["Money"]["Silver"]);
            $("#Money_Electrum").val(res["Money"]["Electrum"]);
            $("#Money_Gold").val(res["Money"]["Gold"]);
            $("#Money_Platinum").val(res["Money"]["Platinum"]);
            $("#CharacterSheet_Equipment").val(res["CharacterSheet"]["Equipment"]);

            $("#CharacterSheet_PersonalityTraits").val(res["CharacterSheet"]["PersonalityTraits"]);
            $("#CharacterSheet_Ideals").val(res["CharacterSheet"]["Ideals"]);
            $("#CharacterSheet_Bonds").val(res["CharacterSheet"]["Bonds"]);
            $("#CharacterSheet_Flaws").val(res["CharacterSheet"]["Flaws"]);

            $("#CharacterSheet_Features").val(res["CharacterSheet"]["Features"]);
            $("#CharacterSheet_Traits").val(res["CharacterSheet"]["Traits"]);
        }
        //error: function (xhr, status, error) {
        //    alert(xhr.responseText);
        //    alert(status.responseText);
        //    alert(error.responseText);
        //}
    });
});

var savetimer = 0;
var keyPressBool = false;

//set on on keypress event listener, listens for objects with the .sheetObj class, and provides an action
//$(".sheetObj").keypress(function (e) {
$(".container-fluid").on("keyup", ".sheetObj", function (e) {
    //stores that keypress even has happened.
    keyPressBool = true;
    //checks to see if 3 or more seconds has passed since the last keypress
    if (savetimer === 3) {
        //if timer is three prevent this event from happening
        e.preventDefault();
        return false;
    }
    //if savetimer variable is not 3
    var actionUrl = "UpdateCharacterProperty";  // get the form action value
    //ajax post object to server
    //var obj = {
    //    name: $(this).attr("name"),
    //    value: $(this).val()
    //};
    //var obj = $(e.target).serializeArray();
    var n = $(this).attr("name");
    var val = $(this).val();
    //$.post(actionUrl, $(this).serialize(), function (res) {
    $.post(actionUrl, {names:n, value:val}, function (res) {
        //res is the response coming from our ajax call. Use this to update DOM
        $("#viewB").html(res);
    });
    //sets savetimer to 3 to represesnt 3 seconds
    savetimer = 3;
    //activates time function, which counts 3 seconds
    timer();
});

//save changes made to character sheet
//event listener and handler for when focus is taken off elements with the class .sheetObj
$(".container-fluid").on("change", ".sheetObj", function (e) {
    //this is a bool to prevent the event from firing if no keys have been pressed for that control
    if (keyPressBool !== true) {
        e.preventDefault();
        return false;
    }
    var actionUrl = "UpdateCharacterSheet";  // get the form action value
    var n = $(this).attr("name");
    var val = $(this).val();
    //ajax post object to server
    $.post(actionUrl, { names: n, value: val }, function (res) {
        //res is the response coming from our ajax call. Use this to update DOM
        $("#viewB").html(res);
    });
    keyPressBool = false;
});

//waits 3 seconds and then sets savetimer back to 0
function timer() {
    setInterval(function () { savetimer = 0; }, 3000);
}

//changes the ability modifier under the stat number.
$(".container-fluid").on("change", ".statbox", function (e) {
    var modVal = Math.floor((e.target.value -10) / 2);
    switch ($(this).attr("id")) {
        case "CharacterSheet_Strength":
            $("#strMod").html(modVal);
            break;
        case "CharacterSheet_Dexterity":
            $("#dexMod").html(modVal);
            break;
        case "CharacterSheet_Constitution":
            $("#conMod").html(modVal);
            break;
        case "CharacterSheet_Intelligence":
            $("#intMod").html(modVal);
            break;
        case "CharacterSheet_Wisdom":
            $("#wisMod").html(modVal);
            break;
        case "CharacterSheet_Charisma":
            $("#chaMod").html(modVal);
            break;
        default:
            return false;
    }
});
