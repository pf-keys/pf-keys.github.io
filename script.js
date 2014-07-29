function removedanger(type, i)
{
	var k;
	if (type === "all")
	{
		for (k=0;k<=8;k++)
		{
			$(".tr"+k+".td"+i).children().removeClass("danger");
		}
	}
	else
	{
		for (k=4;k<=8;k++)
		{
			$(".tr"+k+".td"+i).children().removeClass("danger");
		}
	}
}

function showareassignin()
{
	var i, j;
	if ($("#ALLsignin").is(":checked"))
	{
		$(".tr1.td0").show();
		$(".tr2.td0").show();
		for (i=1;i<=6;i++)
		{
			$(".tr1.td"+i).hide();
			$(".tr2.td"+i).hide();
		}
		$("#ALLsignin").addClass("active");
		$("#ABCDEFsignin").removeClass("active");
		for (j=0;j<=6;j++)
		{
			removedanger("all", j);
		}
	}
	if ($("#ABCDEFsignin").is(":checked"))
	{
		$(".tr1.td0").hide();
		$(".tr2.td0").hide();
		for (i=1;i<=6;i++)
		{
			$(".tr1.td"+i).show();
			$(".tr2.td"+i).show();
		}
		$("#ABCDEFsignin").addClass("active");
		$("#ALLsignin").removeClass("active");
		for (j=0;j<=6;j++)
		{
			removedanger("all", j);
		}
	}
}

function showareasptr()
{
	var i, j;
	if ($("#ALLptr").is(":checked"))
	{
		$(".tr4.td0").show();
		$(".tr5.td0").show();
		$(".tr6.td0").show();
		$(".tr7.td0").show();
		for (i=1;i<=6;i++)
		{
			$(".tr4.td"+i).hide();
			$(".tr5.td"+i).hide();
			$(".tr6.td"+i).hide();
			$(".tr7.td"+i).hide();
		}
		$("#ALLptr").addClass("active");
		$("#ABCDEFptr").removeClass("active");
		for (j=0;j<=6;j++)
		{
			removedanger("all", j);
		}
	}
	if ($("#ABCDEFptr").is(":checked"))
	{
		$(".tr4.td0").hide();
		$(".tr5.td0").hide();
		$(".tr6.td0").hide();
		$(".tr7.td0").hide();
		for (i=1;i<=6;i++)
		{
			$(".tr4.td"+i).show();
			$(".tr5.td"+i).show();
			$(".tr6.td"+i).show();
			$(".tr7.td"+i).show();
		}
		$("#ABCDEFptr").addClass("active");
		$("#ALLptr").removeClass("active");
		for (j=0;j<=6;j++)
		{
			removedanger("all", j);
		}
	}
}

function toggledis(i)
{
		if ($("#"+i+"checkbox").is(":checked"))
		{
			$("."+i+"input").prop("disabled", false);
			toggleptrtapps(i);
		}
		else
		{
			$("."+i+"input").prop("disabled", true);
			removedanger("all", i);
		}
}

function toggleptrtapps(i)
{
	if ($("#"+i+"1PTRTAORPPS").is(":checked"))
	{
		$("#"+i+"PTRTA").prop("disabled", false);
		$("#"+i+"STOCK").prop("disabled", false);
		$("#"+i+"PPS").prop("disabled", true);
		removedanger("ptr", i);
	}
	else if ($("#"+i+"2PTRTAORPPS").is(":checked"))
	{
		$("#"+i+"PTRTA").prop("disabled", true);
		$("#"+i+"STOCK").prop("disabled", true);
		$("#"+i+"PPS").prop("disabled", false);
		removedanger("ptr", i);
	}
	else if ($("#"+i+"3PTRTAORPPS").is(":checked"))
	{
		$("#"+i+"PTRTA").prop("disabled", true);
		$("#"+i+"STOCK").prop("disabled", true);
		$("#"+i+"PPS").prop("disabled", true);
		removedanger("ptr", i);
	}
}

function generate()
{
	var j, k, pcc, result, errors, first;
	for (j=0;j<=6;j++)
	{
		removedanger("all", j);
	}
	result = "^SR";
	errors = 0;
	first = 0;
	for (j=1;j<=6;j++)
	{
		if (checkactivearea(j))
		{
			result = result + "^N¤" + convertarea(j) + "^^E^H";
			if (first === 0)
			{
				first = j;
				if ($("#ALLsignin").is(":checked"))
				{
					errors = errors + checkerrors("ref",0);
					if (checkpcc(0).result === "ok")
					{
						pcc = "-" + checkpcc(0).entry;
					}
					else
					{
						pcc = "";
					}
					result = result + "SI*" + checkreference(0).entry + pcc + "^E^W";
				}
			}
			if ($("#ABCDEFsignin").is(":checked"))
			{
				errors = errors + checkerrors("ref",j);
				if (checkpcc(j).result === "ok")
				{
					pcc = "-" + checkpcc(j).entry;
				}
				else
				{
					pcc = "";
				}
				result = result + "SI" + checkreference(j).entry + pcc + "^E^W";
			}
			errors = errors + checkerrors("aaa",j);
			if (checkaaa(j).result === "ok")
			{
				result = result + "AAA" + checkaaa(j).entry + "^E^H";
			}
			if ((checkptrtaorpps(j).entry === "PTR") && ($("#ABCDEFptr").is(":checked")))
			{
				errors = errors + checkerrors("ptr",j);
				result = result + "PTR/" + checkptrta(j).entry + "^E^H";
				result = result + "DSIV" + checkptrta(j).entry + "^E^H" + checkstock(j).entry + "^E^H";
			}
			if ((checkptrtaorpps(0).entry === "PTR") && ($("#ALLptr").is(":checked")))
			{
				errors = errors + checkerrors("ptr",0);
				result = result + "PTR/" + checkptrta(0).entry + "^E^H";
				result = result + "DSIV" + checkptrta(0).entry + "^E^H" + checkstock(0).entry + "^E^H";
			}
			if ((checkptrtaorpps(j).entry === "PPS") && ($("#ABCDEFptr").is(":checked")))
			{
				errors = errors + checkerrors("pps",j);
				result = result + "PPS" + checkpps(j).entry + "^E^H^H";
			}
		}
	}
	if (first !== 0)
	{
		result = result + "^N¤" + convertarea(first) + "^^E^H";
		if ((checkptrtaorpps(0).entry === "PPS") && ($("#ALLptr").is(":checked")))
			{
				errors = errors + checkerrors("pps",0);
				result = result + "PPS" + checkpps(0).entry + "^E^H^H";
			}
		if (errors === 0)
		{
			printresult(result);
		}
	}
}

function checkactivearea(area)
{
	if ($("#"+area+"checkbox").is(":checked"))
	{
		return true;
	}
	else
	{
		return false;
	}
}

function checkpcc(area)
{
	var result, entry;
	if ($("#"+area+"PCC").val().length === 4)
	{
		entry = $("#"+area+"PCC").val();
		result = "ok";
	}
	else if ($("#"+area+"PCC").val().length === 0)
	{
		result = "no";
	}
	else
	{
		result = "er";
	}
	return{
		entry: entry,
		result: result
	};
}

function checkreference(area)
{
	var result, entry;
	if (($("#"+area+"Reference").val().length >=3) && ($("#"+area+"Reference").val().length <= 4))
	{
		entry = $("#"+area+"Reference").val();
		result = "ok";
	}
	else if ($("#"+area+"Reference").val().length === 0)
	{
		result = "no";
	}
	else
	{
		result = "er";
	}
	return{
		entry: entry,
		result: result
	};
}

function checkaaa(area)
{
	var result, entry;
	if ($("#"+area+"AAA").val().length === 4)
	{
		entry = $("#"+area+"AAA").val();
		result = "ok";
	}
	else if ($("#"+area+"AAA").val().length === 0)
	{
		result = "no";
	}
	else
	{
		result = "er";
	}
	return{
		entry: entry,
		result: result
	};
}

function checkptrtaorpps(area)
{
	var result, entry;
	if ($("#"+area+"1PTRTAORPPS").is(":checked"))
	{
		entry = "PTR";
		result = "ok";
	}
	else if ($("#"+area+"2PTRTAORPPS").is(":checked"))
	{
		entry = "PPS";
		result = "ok";
	}
	else if ($("#"+area+"3PTRTAORPPS").is(":checked"))
	{
		entry = "NONE";
		result = "no";
	}
	else
	{
		result = "er";
	}
	return{
		entry: entry,
		result: result
	};
}

function checkptrta(area)
{
	var result, entry;
	if ($("#"+area+"PTRTA").val().length === 6)
	{
		entry = $("#"+area+"PTRTA").val();
		result = "ok";
	}
	else if ($("#"+area+"PTRTA").val().length === 0)
	{
		result = "no";
	}
	else
	{
		result = "er";
	}
	return{
		entry: entry,
		result: result
	};
}

function checkstock(area)
{
	var result, entry;
	if ($("#"+area+"STOCK").val() === "BSP")
	{
		entry = "W*RU";
		result = "ok";
	}
	else if ($("#"+area+"STOCK").val() === "SU")
	{
		entry = "W*1R";
		result = "ok";
	}
	else if ($("#"+area+"STOCK").val() === "S7")
	{
		entry = "W*1Y";
		result = "ok";
	}
	else if ($("#"+area+"STOCK").val() === "TCH")
	{
		entry = "W*1T";
		result = "ok";
	}
	else if ($("#"+area+"STOCK").val() === "-")
	{
		result = "no";
	}
	else
	{
		result = "er";
	}
	return{
		entry: entry,
		result: result
	};
}

function checkpps(area)
{
	var result, entry;
	if (($("#"+area+"PPS").val() >= 1) && ($("#"+area+"PPS").val() <= 10))
	{
		entry = $("#"+area+"PPS").val();
		result = "ok";
	}
	else if ($("#"+area+"PPS").val() === "-")
	{
		result = "no"; 
	}
	else
	{
		result = "er";
	}
	return{
		entry: entry,
		result: result
	};
}

function checkerrors(where, area)
{
	var result = 0;
	switch (where)
	{
		case "ref":
			if (checkpcc(area).result === "er")
			{
				result = result+1;
				$(".tr2.td"+area).children().addClass("danger");
			}
			if (checkreference(area).result === "er")
			{
				result = result+1;
				$(".tr1.td"+area).children().addClass("danger");
			}
			if (checkreference(area).result === "no")
			{
				result = result+1;
				$(".tr1.td"+area).children().addClass("danger");
			}
			return result;
		case "aaa":
			if (checkaaa(area).result === "er")
			{
				result = result+1;
				$(".tr3.td"+area).children().addClass("danger");
			}
			if (checkptrtaorpps(area).result === "er")
			{
				result = result+1;
				$(".tr4.td"+area).children().addClass("danger");
			}
			return result;
		case "ptr":
			if (checkptrtaorpps(area).entry === "PTR")
			{
				if (checkptrta(area).result === "er")
				{
					result = result+1;
					$(".tr5.td"+area).children().addClass("danger");
				}
				if (checkstock(area).result === "er")
				{
					result = result+1;
					$(".tr6.td"+area).children().addClass("danger");
				}
				if (checkptrta(area).result === "no")
				{
					result = result+1;
					$(".tr5.td"+area).children().addClass("danger");
				}
				if (checkstock(area).result === "no")
				{
					result = result+1;
					$(".tr6.td"+area).children().addClass("danger");
				}
			}
			return result;
		case "pps":
			if (checkptrtaorpps(area).entry === "PPS")
			{
				if (checkpps(area).result === "er")
				{
					result = result+1;
					$(".tr7.td"+area).children().addClass("danger");
			
				}
				if (checkpps(area).result === "no")
				{
					result = result+1;
					$(".tr7.td"+area).children().addClass("danger");
			
				}
			}
			return result;
	}
}

function printresult(result)
{
	$("#textresult").val(result.toUpperCase());
}

function convertarea(i)
{
	switch (i)
	{
		case 1:
			return "A";
		case 2:
			return "B";
		case 3:
			return "C";
		case 4:
			return "D";
		case 5:
			return "E";
		case 6:
			return "F";
		case 7:
			return "A";
	}
}

function generatespectra()
{
	var result, i;
	i = 0;
	result = "";
	if (($('#AL').prop('checked')) && ($('#FL').prop('checked') === false))
	{
		if (i > 0)
		{
			result = result + "/";
		}
		result = result + "AL-^Tairline code^^W";
		i = i + 1;
	}
	if ($('#FL').prop('checked'))
	{
		if (i > 0)
		{
			result = result + "/";
		}
		result = result + "AL-^Tairline code^^W/FL-^Tflight number^^W";
		i = i + 1;
	}
	if ($('#ALL').prop('checked'))
	{
		if (i > 0)
		{
			result = result + "/";
		}
		result = result + "ALL";
		i = i + 1;
	}
	if ($('#BO').prop('checked'))
	{
		if (i > 0)
		{
			result = result + "/";
		}
		result = result + "BO-^Tboarding airport and arrival airport^^W";
		i = i + 1;
	}
	if ($('#CD').prop('checked'))
	{
		if (i > 0)
		{
			result = result + "/";
		}
		result = result + "CD-^Tcreation date^^W";
		i = i + 1;
	}
	if ($('#DK').prop('checked'))
	{
		if (i > 0)
		{
			result = result + "/";
		}
		result = result + "DK-^Tdk number^^W";
		i = i + 1;
	}
	if ($('#IN').prop('checked'))
	{
		if (i > 0)
		{
			result = result + "/";
		}
		result = result + "IN-Y";
		i = i + 1;
	}
	if ($('#NA').prop('checked'))
	{
		if (i > 0)
		{
			result = result + "/";
		}
		result = result + "NA-^Tpassenger name^^W";
		i = i + 1;
	}
	if ($('#RM').prop('checked'))
	{
		if (i > 0)
		{
			result = result + "/";
		}
		result = result + "RM-^Tremarks text^^W";
		i = i + 1;
	}
	if ($('#TD').prop('checked'))
	{
		if (i > 0)
		{
			result = result + "/";
		}
		result = result + "TD-^Ttime limit date^^W";
		i = i + 1;
	}
	if ($('#SD').prop('checked'))
	{
		if (i > 0)
		{
			result = result + "/";
		}
		result = result + "SD-^Ttravel date^^W";
		i = i + 1;
	}
	if ($('#SI').prop('checked'))
	{
		if (i > 0)
		{
			result = result + "/";
		}
		result = result + "SI-^Tagent sign^^W";
		i = i + 1;
	}
	if (i > 0)
	{
		result = "^SRQK¥" + result + "^E^HQJ/^Tqueue number^^W^W^E";
		printresult(result);
	}
}

function disableboxes(type)
{
	if (type === "all")
	{
		if ($('#ALL').prop('checked'))
		{
			$("#AL, #FL, #SI, #BO, #CD, #DK, #IN, #NA, #RM, #TD, #SD").hide();
			$("#AL, #FL, #SI, #BO, #CD, #DK, #IN, #NA, #RM, #TD, #SD").prop('checked', false);
		}
		else
		{
			$("#AL, #FL, #SI, #BO, #CD, #DK, #IN, #NA, #RM, #TD, #SD").show();
		}
	}
	if (type === "td")
	{
		if ($('#TD').prop('checked'))
		{
			$("#AL, #FL, #SI, #BO, #CD, #DK, #IN, #NA, #RM, #ALL, #SD").hide();
			$("#AL, #FL, #SI, #BO, #CD, #DK, #IN, #NA, #RM, #ALL, #SD").prop('checked', false);
		}
		else
		{
			$("#AL, #FL, #SI, #BO, #CD, #DK, #IN, #NA, #RM, #ALL, #SD").show();
		}
	}
}