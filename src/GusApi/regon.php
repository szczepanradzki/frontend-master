<?php

require_once './vendor/autoload.php';

use GusApi\BulkReportTypes;
use GusApi\Exception\InvalidUserKeyException;
use GusApi\Exception\NotFoundException;
use GusApi\GusApi;
use GusApi\ReportTypes;

$gus = new GusApi('bc92aac00bf14330ad07');
//for development server use:
//$gus = new GusApi('abcde12345abcde12345', 'dev');
$data = json_decode(file_get_contents("php://input"), true);
$task = $data['NIP'];
try {
    $nipToCheck = $task; //change to valid nip value
    $gus->login();

    $gusReports = $gus->getByNip($nipToCheck);

    foreach ($gusReports as $gusReport) {
        $reportType = ReportTypes::REPORT_ACTIVITY_PHYSIC_PERSON;
        $post_data = array('name' => $gusReport->getName(),
            'street' => $gusReport->getStreet(),
            'houseno' => $gusReport->getPropertyNumber()."/".$gusReport->getApartmentNumber(),
            'zipcode' => $gusReport->getZipCode(),
            'city' => $gusReport->getPostCity());
            echo json_encode($post_data);
    }

} catch (InvalidUserKeyException $e) {
    echo 'Bad user key';
} catch (NotFoundException $e) {
    echo 'No data found <br>';
    echo 'For more information read server message below: <br>';
    echo $gus->getResultSearchMessage();
}
