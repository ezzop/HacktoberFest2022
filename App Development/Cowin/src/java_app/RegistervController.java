package java_app;

import java.net.URL;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ResourceBundle;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.ComboBox;
import javafx.scene.control.DatePicker;
import javafx.stage.Stage;
import javax.swing.JOptionPane;

public class RegistervController implements Initializable {

    @FXML
    private ComboBox dosenum;

    @FXML
    private DatePicker type_date_r;

    @FXML
    private Button btn_logout;

    @FXML
    private Button btn_registerv;

    @FXML
    private ComboBox vaccinename;

    Connection con = null;
    ResultSet rs = null;
    PreparedStatement ps = null;
    public String x, dose, date, vaccinen, dose1;

    @FXML
    private void Logout(ActionEvent event) throws Exception {
        try {
            JOptionPane.showMessageDialog(null, "Logout Successful");
            btn_logout.getScene().getWindow().hide();
            FXMLLoader loader = new FXMLLoader(getClass().getResource("FXML.fxml"));
            Parent root = loader.load();
            Stage mainstage = new Stage();
            Scene scene = new Scene(root);
            mainstage.setScene(scene);
            mainstage.show();
        } catch (Exception ex) {
            JOptionPane.showMessageDialog(null, ex);
        }
    }

    @FXML
    private void Register(ActionEvent event) throws Exception {
        con = mysqlconnect.Connectdb();
        boolean st = false;
        try {
            ps = con.prepareStatement("select * from register where email=?");
            ps.setString(1, x);
            rs = ps.executeQuery();
            dose = dosenum.getValue().toString();
            date = type_date_r.getValue().toString();
            vaccinen = vaccinename.getValue().toString();
            st = rs.next();
            if (st) {
                if (dose.equals("Dose 1")) {
                    JOptionPane.showMessageDialog(null, "Already registered for Dose 1", "Warning", JOptionPane.ERROR_MESSAGE);
                    btn_registerv.getScene().getWindow().hide();
                    FXMLLoader loader = new FXMLLoader(getClass().getResource("Registerv.fxml"));
                    Parent root = loader.load();
                    RegistervController registervcontroller = loader.getController();
                    registervcontroller.transferMessage(x);
                    Stage mainstage = new Stage();
                    Scene scene = new Scene(root);
                    mainstage.setScene(scene);
                    mainstage.show();
                } else {
                    ps = con.prepareStatement("select * from register where email=?");
                    ps.setString(1, x);
                    rs = ps.executeQuery();
                    st = rs.next();
                    if (st) {
                        dose1 = rs.getString(4);
                    }
                    if (dose1.equals(vaccinen)) {
                        ps = con.prepareStatement(" UPDATE register SET dose2 = ?, date2=?, vaccine2=? where email=?");
                        ps.setString(1, dose);
                        ps.setString(2, date);
                        ps.setString(3, vaccinen);
                        ps.setString(4, x);
                        int i = ps.executeUpdate();
                        if (i > 0) {
                            JOptionPane.showMessageDialog(null, "Registration Successful");
                            btn_registerv.getScene().getWindow().hide();
                            FXMLLoader loader = new FXMLLoader(getClass().getResource("Homepage.fxml"));
                            Parent root = loader.load();
                            HomepageController homepagecontroller = loader.getController();
                            homepagecontroller.transferMessage(x);
                            Stage mainstage = new Stage();
                            Scene scene = new Scene(root);
                            mainstage.setScene(scene);
                            mainstage.show();
                        } else {
                            JOptionPane.showMessageDialog(null, "Registration Unsuccessful");
                        }
                    } else {
                        JOptionPane.showMessageDialog(null, "Choose same vaccine for Dose 2", "Warning", JOptionPane.ERROR_MESSAGE);
                        btn_registerv.getScene().getWindow().hide();
                        FXMLLoader loader = new FXMLLoader(getClass().getResource("Registerv.fxml"));
                        Parent root = loader.load();
                        RegistervController registervcontroller = loader.getController();
                        registervcontroller.transferMessage(x);
                        Stage mainstage = new Stage();
                        Scene scene = new Scene(root);
                        mainstage.setScene(scene);
                        mainstage.show();
                    }
                }
            } else {
                ps = con.prepareStatement("insert into register (email,dose1,date1,vaccine1) values(?,?,?,?)");
                ps.setString(1, x);
                ps.setString(2, dose);
                ps.setString(3, date);
                ps.setString(4, vaccinen);
                int i = ps.executeUpdate();
                if (i > 0) {
                    System.out.println(x);
                    JOptionPane.showMessageDialog(null, "Registration Successful");
                    btn_registerv.getScene().getWindow().hide();
                    FXMLLoader loader = new FXMLLoader(getClass().getResource("Homepage.fxml"));
                    Parent root = loader.load();
                    HomepageController homepagecontroller = loader.getController();
                    homepagecontroller.transferMessage(x);
                    Stage mainstage = new Stage();
                    Scene scene = new Scene(root);
                    mainstage.setScene(scene);
                    mainstage.show();
                } else {
                    JOptionPane.showMessageDialog(null, "Registration Unsuccessful");
                }
            }

        } catch (Exception ex) {
            JOptionPane.showMessageDialog(null, ex);
        }
    }

    @Override
    public void initialize(URL url, ResourceBundle rb) {
        dosenum.getItems().addAll("Dose 1", "Dose 2");
        vaccinename.getItems().addAll("Covaxin", "Covishield");
    }

    void transferMessage(String x) {
        this.x = x;

    }

}
