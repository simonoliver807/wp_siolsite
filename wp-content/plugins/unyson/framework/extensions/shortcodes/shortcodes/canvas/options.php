<?php if ( ! defined( 'FW' ) ) {
	die( 'Forbidden' );
}

$options = array(
    'canvas_id' => array(
        'type'  => 'text',
        'label' => __('Canvas ID', '{FW}'),
        'desc'  => __('Please input Canvas ID', '{FW}')
    ),
    'canvas_class' => array(
        'type'  => 'text',
        'label' => __('Canvas Class', '{FW}'),
        'desc'  => __('Please input Canvas Class', '{FW}')
    )
);