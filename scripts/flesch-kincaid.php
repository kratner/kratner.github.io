<?php
$text = "Please type in the text you'd like to test.";
if(isset($_POST["text"])) $text = $_POST["text"];

$total_words = str_word_count($text);
$total_sentences = preg_match_all('/[.!?\r]/', $text, $tmp );
$total_syllables = preg_match_all('/[aeiouy]/', $text, $tmp );

$reading_ease = 206.835 - 1.015 * ($total_words/$total_sentences) - 84.6 * ($total_syllables/$total_words);
$reading_grade = 0.39 * ($total_words/$total_sentences) + 11.8 * ($total_syllables/$total_words) - 15.59;
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <title>Flesch–Kincaid Readability Test</title>
</head>
<body>
<h1>Flesch–Kincaid Readability Test</h1>

<p><a href="http://en.wikipedia.org/wiki/Flesch%E2%80%93Kincaid_readability_test" target="_blank">
Read about the Flesch-Kincaid Algorithm
</a></p>

<form method="post" action="#">
	<textarea name="text" cols="100" rows="10"><?php echo $text; ?></textarea>
	<br/><input type="submit" value="Submit Text" />
</form>
<br/>
<?php
echo "Words: ".$total_words."<br/>";
echo "Sentences: ".$total_sentences."<br/>";
echo "Syllables: ".$total_syllables."<br/><br/>";
echo "Reading Ease: ".$reading_ease."<br/>";
echo "Reading Grade: ".$reading_grade."<br/><br/>";
?>

<table border="1">
	<thead>
		<tr>
			<th colspan="2">Reading Ease Score Chart</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>Score</th>
			<th>Notes</th>
		</tr>
		<tr>
			<td>90.0&ndash;100.0</td>
			<td>easily understandable by an average 11-year-old student</td>
		</tr>
		<tr>
			<td>60.0&ndash;70.0</td>
			<td>easily understandable by 13- to 15-year-old students</td>
		</tr>
		<tr>
			<td>0.0&ndash;30.0</td>
			<td>best understood by university graduates</td>
		</tr>
	</tbody>
</table>
</body>
</html>