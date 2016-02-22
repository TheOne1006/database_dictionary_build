<?php
// require config
$configString = file_get_contents('./server/config.json');
$configOption = json_decode($configString);


// difine path & Template
$filePaths = array(
  $configOption->path->table,
  $configOption->path->sql,
  $configOption->path->md
);

$tableTemp = array(
  'tableName' => '',
  'fields'    => array(),
  'keys'      => array()
);

$fieldTemp = array(
  'Field'     => '',
  'Type'      => '',
  'Collation' => '',
  'Null'      => '',
  'Key'       => '',
  'Default'   => NULL,
  'Extra'     => '',
  'Comment'   => ''
);

$keyTemp = array(
  'Non_unique'    => '',
  'Key_name'      => '',
  'Column_name'   => '',
  'Type'          => '',
  'Comment'       => '',
  'Index_comment' => ''
);

$descTemp = array(
  'Name'    => '',
  'Engine'  => '',
  'Comment' => ''
);


// build filePath
foreach ($filePaths as $path)
{
  mkdirp($path);
}

// connect mysql
$con = mysql_connect($configOption->db->host, $configOption->db->user, $configOption->db->password);
if (!$con)
{
  die('Could not connect: ' . mysql_error());
}
mysql_query('set names utf8');

// make foo the current db
mysql_select_db($configOption->db->database, $con) or die (mysql_error());

// sql execute && file write

$sql_show_table = "SHOW TABLE STATUS";
$result_show_table = mysql_query($sql_show_table);
$all_tables_desc_arr = array();
$all_table_name = array();

while ($property = mysql_fetch_assoc($result_show_table))
{
  $all_table_name[] = $property['Name'];
  // p($property);
  $table_desc = array();

  foreach ($descTemp as $descKey => $v)
  {
    $table_desc[$descKey] = $property[$descKey];
  }

  $all_tables_desc_arr[] = $table_desc;

  $stringify_all_tables = json_encode($all_tables_desc_arr);

  dowrite_format($configOption->path->all_tables, $stringify_all_tables, 'json');
}


foreach ($all_table_name as $table_name)
{
  $sql_show_columns = 'SHOW FULL COLUMNS FROM '.$table_name;
  $sql_show_keys    = 'SHOW KEYS FROM '.$table_name;
  $sql_create_sql    = 'SHOW CREATE TABLE '.$table_name;

  $result_show_columns = mysql_query($sql_show_columns);
  $result_show_keys    = mysql_query($sql_show_keys);
  $result_create_sql    = mysql_query($sql_create_sql);

  $table_all_desc = array();
  $table_fields_arr = array();
  $table_keys_arr = array();

  // clumns
  while ($property_columns = mysql_fetch_assoc($result_show_columns))
  {
    $field_arr = array();

    foreach ($fieldTemp as $fieldKey => $v)
    {
      if($fieldKey === 'Comment')
      {
          $field_arr[$fieldKey] = urlencode($property_columns[$fieldKey]);
      }
      else
      {
        $field_arr[$fieldKey] = $property_columns[$fieldKey];
      }
    }

    $table_fields_arr[] = $field_arr;
  }

  // keys
  while ($property_keys = mysql_fetch_assoc($result_show_keys))
  {

    $keys_arr = array();

    foreach ($keyTemp as $keyKey => $v)
    {
      if(isset($property_keys[$keyKey]))
      {
        $keys_arr[$keyKey] = $property_keys[$keyKey];
      }
    }

    if($keys_arr['Key_name'] === 'PRIMARY')
    {
      $keys_arr['Type'] = 'PRIMARY';
    }
    else if($keys_arr['Non_unique'] === '0')
    {
      $keys_arr['Type'] = 'UNIQUE';
    }
    else
    {
      $keys_arr['Type'] = 'INDEX';
    }

    $table_keys_arr[] = $keys_arr;
  }

  $table_all_desc['tableName'] = $table_name;
  $table_all_desc['fields'] = $table_fields_arr;
  $table_all_desc['keys'] = $table_keys_arr;


  $stringify_table_all_desc = urldecode(json_encode($table_all_desc));

  dowrite_format($configOption->path->table.$table_name.'.json', $stringify_table_all_desc, 'json');


  // create_sql
  $string_create_sql = '';
  if($property_create_sql =  mysql_fetch_row($result_create_sql))
  {
    $string_create_sql = preg_replace("/AUTO_INCREMENT=\d+\s/i",'',$property_create_sql[1]).';';

    dowrite_format($configOption->path->sql.$table_name.'.sql', $string_create_sql, 'json');
  }
}



// close mysql connect

//Tool function

function mkdirp($path = '')
{
  if(!file_exists($path))
  {
      mkdir($path, 0777, true);
  }

}

function dowrite_format($filename = '', $str = '', $type = '')
{

  if(!empty($filename) && !empty($str))
  {
    if($type === 'json')
    {
      $str = preg_replace("/({)/", "$1\n", $str);
      $str = preg_replace("/(\",)/", "$1\n", $str);
      $str = preg_replace("/\"}/", "\"\n}", $str);
    }

    file_put_contents($filename, $str);
  }
}


// common test
function p($obj, $is_end =null)
{
  echo '<pre>';
  var_dump($obj);
  echo '</pre>';

  if($is_end){
    exit;
  }
}
 ?>
