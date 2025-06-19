<?php
$pageTitle = "Dashboard";
?>

<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $pageTitle; ?></title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
	<?php include 'header.php'; ?>
  	<div id="sensor-grid"></div>
  	<script src="script.js"></script>
  </div>
</body>
</html>
