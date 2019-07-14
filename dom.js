$(function() {
    $.ajax({
        url: 'booking2.json',
        success: function(d) {
            $('#title').text(d.title);
            $('#screen').text(d.screen);
            $('#runTime').text(d.runtime);
            $('#date').text(d.date.substr(0, 10));
            $('#time').text(d.date.substr(11, 5));
            $('<img id="myimage">').attr('src', d.image).appendTo('#poster');
            $('#myimage').width(170).height(250);
            $('#sofareq').text(d.sofaRequired);
            $('#armreq').text(d.armchairRequire);
            $('#rating').text(d.rating);


            var seatNum = 1;
            var t = $('<table/>').appendTo('#theatre');
            for (var i = 0; i < d.rowLabels.length; i++) {
                // Create a table row
                var tr = $('<tr/>')
                    .append($('<th/>', {
                        text: d.rowLabels[i]
                    }))
                    .appendTo(t);

                for (var j = 0; j < d.tmap[i].length; j++) {
                    var t0 = d.tmap[i][j];
                    var u0 = d.umap[i][j];
                    var td = $('<td/>');

                    if (t0 === 'L')
                        td.addClass('left-sofa');

                    if (t0 === 'R')
                        td.addClass('right-sofa');

                    if (t0 === 'A')
                        td.addClass('armchair');
                    td.data({
                        row: d.rowLabels[i],
                        column: j + 1
                    });

                    tr.append(td);

                    if (u0 === 'X') {
                        td.addClass('taken');
                        td.text(d.rowLabels[i].charAt(0) + seatNum++);
                    }
                    if (u0 === 'O') {
                        td.addClass('free');
                        td.text(d.rowLabels[i].charAt(0) + seatNum++);
                    }
                    if (u0 === 'M') {
                        td.addClass('mine');
                        td.text(d.rowLabels[i].charAt(0) + seatNum++);
                    }

                    var ms = $('td.mine');
                    var sl = ms.map(function() {

                        return ($(this).text());
                    })
                    var ul = $('<ul/>');
                    for (var g = 0; g < sl.length; g++) {
                        ul.append($('<li/>', {
                            text: sl[g]
                        }))
                        $('#cusSeat ul').remove();
                        $('#cusSeat').append(ul);
                    };

                }
                //Makes sure that when it goes down a row it starts back at 1
                seatNum = 1;

                tr.append($('<th/>', {
                    text: d.rowLabels[i]
                }));

            }

            $('td.left-sofa').click(function() {


                if ($(this).hasClass('left-sofa free')) {
                    //$(this).text("M");
                    $(this).addClass('mine');
                    $(this).removeClass('free');
                } else if ($(this).hasClass('left-sofa mine')) {
                    $(this).addClass('free');
                    $(this).removeClass('mine');
                }

                var ms = $('td.mine');
                var sl = ms.map(function() {
                    return ($(this).text());
                })
                var ul = $('<ul/>');
                for (var g = 0; g < sl.length; g++) {
                    ul.append($('<li/>', {
                        text: sl[g]
                    }));
                }
                $('#cusSeat ul').remove();
                $('#cusSeat').append(ul);

                if ((document.getElementsByClassName('right-sofa mine').length +
                        document.getElementsByClassName('left-sofa mine').length) ===
                    (d.sofaRequired * 2) &&
                    document.getElementsByClassName('armchair mine').length === d.armchairRequire) {
                    $('button').addClass('btnCheck');
                    $('button').removeClass('btnError');
                } else {
                    $('button').removeClass('btnCheck');
                    $('button').addClass('btnError').attr('disabled');
                }
            })

            $('td.right-sofa').click(function() {
                if ($(this).hasClass('right-sofa free')) {
                    $(this).addClass('mine');
                    $(this).removeClass('free')
                } else if ($(this).hasClass('right-sofa mine')) {
                    $(this).addClass('free');
                    $(this).removeClass('mine');
                }

                var ms = $('td.mine');
                var sl = ms.map(function() {
                    return ($(this).text());
                })
                var ul = $('<ul/>');
                for (var g = 0; g < sl.length; g++) {
                    ul.append($('<li/>', {
                        text: sl[g]
                    }));
                }
                $('#cusSeat ul').remove();
                $('#cusSeat').append(ul);

                if ((document.getElementsByClassName('right-sofa mine').length +
                        document.getElementsByClassName('left-sofa mine').length) ===
                    (d.sofaRequired * 2) &&
                    document.getElementsByClassName('armchair mine').length === d.armchairRequire) {
                    $('button').addClass('btnCheck');
                    $('button').removeClass('btnError');
                } else {
                    $('button').removeClass('btnCheck');
                    $('button').addClass('btnError').attr('disabled');
                }
            })

            $('td.armchair').click(function() {
                if ($(this).hasClass('armchair free')) {
                    $(this).addClass('mine');
                    $(this).removeClass('free')
                } else if ($(this).hasClass('armchair mine')) {
                    $(this).addClass('free');
                    $(this).removeClass('mine');
                }

                var ms = $('td.mine');
                var sl = ms.map(function() {
                    return ($(this).text());
                })
                var ul = $('<ul/>');
                for (var g = 0; g < sl.length; g++) {
                    ul.append($('<li/>', {
                        text: sl[g]
                    }));
                }
                $('#cusSeat ul').remove();
                $('#cusSeat').append(ul);

                if ((document.getElementsByClassName('right-sofa mine').length +
                        document.getElementsByClassName('left-sofa mine').length) ===
                    (d.sofaRequired * 2) &&
                    document.getElementsByClassName('armchair mine').length === d.armchairRequire) {
                    $('button').addClass('btnCheck');
                    $('button').removeClass('btnError');
                } else {
                    $('button').removeClass('btnCheck');
                    $('button').addClass('btnError').attr('disabled');
                }
            })

        }

    })
});
