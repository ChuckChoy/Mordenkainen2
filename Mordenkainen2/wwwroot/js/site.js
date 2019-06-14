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

//Fires when you select a character. Moved to View
//$("#characterSelect").change(function (e) {
//    //set the controller action
//    var actionUrl = "GetSelectedCharacter";
//    //get value of of selected option
//    //var data = e.val();
//    var data = e.target.value;
//    //post response that will send the value of the selected option
//    $.post(actionUrl, data ,function (res) {
//        //res is the response coming from our ajax call. Use this to update DOM
//        //update all character sheet values.
//        return res;
//    });
//});


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
            $("#CharacterSheet_PlayerName").val(res["CharacterSheet"]["PlayerName"]);
            $("#CharacterSheet_Experience").val(res["CharacterSheet"]["Experience"]);
            $("#CharacterSheet_Strength").val(res["CharacterSheet"]["Strength"]);
            $("#CharacterSheet_Dexterity").val(res["CharacterSheet"]["Dexterity"]);
            $("#CharacterSheet_Constitution").val(res["CharacterSheet"]["Constitution"]);
            $("#CharacterSheet_Intelligence").val(res["CharacterSheet"]["Intelligence"]);
            $("#CharacterSheet_Wisdom").val(res["CharacterSheet"]["Wisdom"]);
            $("#CharacterSheet_Charisma").val(res["CharacterSheet"]["Charisma"]);
            $("#CharacterSheet_Inspiration").val(res["CharacterSheet"]["Inspiration"]);
            $("#CharacterSheet_ProficiencyBonus").val(res["CharacterSheet"]["ProficiencyBonus"]);
            $("#SavingThrows_StrSaveProf").val(res["SavingThrows"]["StrSaveProf"]);
            $("#SavingThrows_StrSave").val(res["SavingThrows"]["StrSave"]);
            $("#SavingThrows_DexSaveProf").val(res["SavingThrows"]["DexSaveProf"]);
            $("#SavingThrows_DexSave").val(res["SavingThrows"]["DexSave"]);
            $("#SavingThrows_ConSaveProf").val(res["SavingThrows"]["ConSaveProf"]);
            $("#SavingThrows_ConSave").val(res["SavingThrows"]["ConSave"]);
            $("#SavingThrows_IntSaveProf").val(res["SavingThrows"]["IntSaveProf"]);
            $("#SavingThrows_IntSave").val(res["SavingThrows"]["IntSave"]);
            $("#SavingThrows_WisSaveProf").val(res["SavingThrows"]["WisSaveProf"]);
            $("#SavingThrows_WisSave").val(res["SavingThrows"]["WisSave"]);
            $("#SavingThrows_CharSaveProf").val(res["SavingThrows"]["ChaSaveProf"]);
            $("#SavingThrows_ChaSave").val(res["SavingThrows"]["ChaSave"]);
            $("#Skills_Acrobatics_T").val(res["SavingThrows"]["StrSaveProf"]);

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
$(".container-fluid").on("keyup", ".statbox", function (e) {
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
