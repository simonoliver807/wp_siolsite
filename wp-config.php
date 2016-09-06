<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

define('WP_HOME','http://siolsite.com');
define('WP_SITEURL','http://siolsite.com');

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'olivoy647');

/** MySQL database username */
define('DB_USER', 'olivoy647');

/** MySQL database password */
define('DB_PASSWORD', 'simon630');

/** MySQL hostname */
define('DB_HOST', 'mysql09.iomart.com');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'Ta`.}8^_:C+P$t9 Q8t$$mmFzuyDl3/<4+ -w4IHU .PlEM8nyDbUI4Y!KkSK]3g');
define('SECURE_AUTH_KEY',  '/q{0<d*w}]]4FT&%fishX+3^&+Cms(K U4Cs>lj8hnN?2Pim5(ehrv;{m5^,ymOq');
define('LOGGED_IN_KEY',    'bqH8G5uwf #o<:o6pE`uk]P?ScsB%$ha.@P!#SclB!5}7pj^MSe|-L>fGPb}Q&pf');
define('NONCE_KEY',        'J>=9TKc&o8fP2=liZ+vQcA=c>yJ+N;,#KRS726^zyu+Pdn:1|wa|?d8NZmQiMO|X');
define('AUTH_SALT',        '[~=j[N1TBfjKXf|qB1prn)OcKA#yA8wjcRw5$HfGm)CDvko,=Am9(U$Co)U@$ ^I');
define('SECURE_AUTH_SALT', 'xcQFCZWe9g3>{w._W<|5Cax~<Mc#6;RRE(P}J5v`Jc,$sn.6|#X@|OK.O;VB1vUC');
define('LOGGED_IN_SALT',   '_$Q?ikhmB{jw~N!Sv^m=bF++zfHeT>rst6f>@|!@I<eBMfe2B2LMK]zCwPL+:fml');
define('NONCE_SALT',       'bu`VTh42RpPV& ]+)6 M{r!{yi(dbYK<1J@Ea^T B%t7j-B}9aA?G3kO8FyX0I!J');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
//siolsite changed from define('WP_DEBUG', false);
define('WP_DEBUG', true);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
